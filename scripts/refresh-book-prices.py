#!/usr/bin/env python3
"""
Refresh Amazon prices for every book in data/library.json.

Reads each book's ASIN from data/library.json, fetches the Amazon product page
with US locale cookies (so prices return in USD regardless of where the script
runs from), parses the Buy Box price, and writes the updated JSON back in place.

Adds `priceCheckedAt` (ISO date) to every book.

Usage:
    python3 scripts/refresh-book-prices.py            # update all
    python3 scripts/refresh-book-prices.py --dry-run  # show changes only
    python3 scripts/refresh-book-prices.py --quiet    # log only changes + errors

Exit codes:
    0  success (prices updated or unchanged)
    1  network/parse failure on more than half the books
    2  bad arguments / can't read data file
"""

import argparse
import json
import re
import sys
import time
import urllib.request
import urllib.error
from datetime import date
from pathlib import Path
from typing import Optional, Tuple

REPO_ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = REPO_ROOT / "data" / "library.json"

USER_AGENT = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
# These cookies force Amazon to serve USD prices regardless of the requesting
# IP's geolocation. Without them, a request from outside the US gets prices in
# the local currency (e.g. ZAR from a South African IP).
COOKIES = "i18n-prefs=USD; lc-main=en_US; session-id=000-0000000-0000000"

# Order matters: the first regex that matches wins. We prefer the Buy Box
# (deal price) over the list price.
PRICE_PATTERNS = [
    # apexPriceToPay (current site format, 2025+)
    r'<span class="aok-offscreen">\s*\$(\d+\.\d{2})\s*</span>',
    # Standard a-offscreen span (most common)
    r'<span class="a-offscreen">\$(\d+\.\d{2})</span>',
    # priceblock_ourprice (legacy)
    r'<span id="priceblock_ourprice"[^>]*>\$(\d+\.\d{2})</span>',
    # priceblock_dealprice (legacy)
    r'<span id="priceblock_dealprice"[^>]*>\$(\d+\.\d{2})</span>',
]

# Amazon throttles aggressive scrapers. Sleep between requests to be polite.
REQUEST_DELAY_SECONDS = 1.5


def extract_asin(amazon_url: str) -> Optional[str]:
    """Parse the ASIN out of an amazon.com/dp/<ASIN>?... URL."""
    if not amazon_url:
        return None
    m = re.search(r"/dp/([A-Z0-9]{10})", amazon_url)
    return m.group(1) if m else None


def fetch_amazon_price(asin: str) -> Tuple[Optional[float], str]:
    """
    Fetch the Amazon product page for ASIN and return (price_in_usd, reason).
    price_in_usd is None on any failure; reason is a short string explaining why.
    """
    url = f"https://www.amazon.com/dp/{asin}"
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml",
            "Cookie": COOKIES,
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        return (None, f"HTTP {e.code}")
    except urllib.error.URLError as e:
        return (None, f"URL error: {e.reason}")
    except (TimeoutError, ConnectionError) as e:
        return (None, f"network: {e}")

    # Detect anti-bot / captcha page
    if "Robot Check" in body or "automated access" in body or "Sorry, we just need" in body:
        return (None, "blocked (captcha)")

    # Try each price pattern in priority order
    for pat in PRICE_PATTERNS:
        m = re.search(pat, body)
        if m:
            try:
                return (float(m.group(1)), "ok")
            except ValueError:
                continue

    return (None, "no price element matched")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="show changes without writing")
    parser.add_argument("--quiet", action="store_true", help="only log changes + errors")
    args = parser.parse_args()

    if not DATA_FILE.exists():
        print(f"ERROR: cannot find {DATA_FILE}", file=sys.stderr)
        return 2

    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    books = data.get("books", [])
    if not books:
        print("ERROR: no books in library.json", file=sys.stderr)
        return 2

    today_iso = date.today().isoformat()
    changes = []
    failures = []
    unchanged = []

    for i, book in enumerate(books):
        slug = book.get("slug", "<no-slug>")
        link = book.get("link", "")
        asin = extract_asin(link)

        # Skip non-Amazon books (e.g. the free Prompt Engineering Guide which links
        # to promptingguide.ai). They keep their existing price (often 0).
        if not asin:
            if not args.quiet:
                print(f"skip {slug}: not an Amazon link")
            book["priceCheckedAt"] = today_iso
            continue

        if i > 0:
            time.sleep(REQUEST_DELAY_SECONDS)

        price, reason = fetch_amazon_price(asin)
        old_price = book.get("price", 0)

        if price is None:
            failures.append((slug, reason))
            print(f"FAIL {slug} ({asin}): {reason}", file=sys.stderr)
            # Don't update the price, but DO update the timestamp so we know
            # we tried.
            book["priceCheckedAt"] = today_iso
            continue

        book["priceCheckedAt"] = today_iso

        # Round to 2 dp for comparison stability
        price_rounded = round(price, 2)
        old_rounded = round(float(old_price), 2)

        if abs(price_rounded - old_rounded) < 0.01:
            unchanged.append(slug)
            if not args.quiet:
                print(f"==   {slug}: ${price_rounded:.2f} (unchanged)")
        else:
            book["price"] = price_rounded
            changes.append((slug, old_rounded, price_rounded))
            sign = "↓" if price_rounded < old_rounded else "↑"
            print(f"{sign}    {slug}: ${old_rounded:.2f} -> ${price_rounded:.2f}")

    # Update top-level metadata
    data.setdefault("_schema_notes", {})
    data["_schema_notes"]["priceCheckedAt"] = (
        "Per-book ISO date of last automated Amazon price refresh. Run "
        "scripts/refresh-book-prices.py to update."
    )

    print("")
    print(f"SUMMARY: {len(changes)} changed, {len(unchanged)} unchanged, {len(failures)} failed")
    if failures:
        print(f"Failures: {[f[0] for f in failures]}")

    if args.dry_run:
        print("(dry run — no file written)")
        return 0

    if changes or any("priceCheckedAt" in b for b in books):
        DATA_FILE.write_text(
            json.dumps(data, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        print(f"Wrote {DATA_FILE}")

    # Fail the workflow if more than half the books failed (likely Amazon is
    # blocking us, no point retrying immediately).
    if len(failures) > len(books) // 2:
        print("ERROR: more than half the books failed — Amazon may be blocking", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
