#!/usr/bin/env python3
"""
Convert a Markdown file to a professionally branded PDF.

Usage:
    python3 scripts/md-to-pdf.py docs/milestone-1-delivery.md
    python3 scripts/md-to-pdf.py docs/milestone-1-delivery.md -o output.pdf

Requires: weasyprint, markdown
    pip install weasyprint markdown
"""

import argparse
import re
import sys
from datetime import date
from pathlib import Path

import markdown
from weasyprint import HTML

SCRIPT_DIR = Path(__file__).parent
LOGO_PATH = SCRIPT_DIR / "assets" / "logo.svg"

BRAND_CSS = """
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* ========================================
   PAGE SETUP
   ======================================== */
@page {
    size: A4;
    margin: 22mm 20mm 26mm 20mm;

    @bottom-left {
        content: "Confidential — Prepared by All Done Sites";
        font-family: 'Inter', sans-serif;
        font-size: 7pt;
        color: #94a3b8;
        letter-spacing: 0.03em;
        border-top: 0.5pt solid #e2e8f0;
        padding-top: 4pt;
    }

    @bottom-right {
        content: counter(page) " / " counter(pages);
        font-family: 'Inter', sans-serif;
        font-size: 7pt;
        color: #94a3b8;
        letter-spacing: 0.05em;
        border-top: 0.5pt solid #e2e8f0;
        padding-top: 4pt;
    }
}

@page :first {
    margin-top: 0;
    @bottom-left { content: none; border: none; }
    @bottom-right { content: none; border: none; }
}

/* ========================================
   BASE
   ======================================== */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 9.5pt;
    line-height: 1.65;
    color: #334155;
    background: #fff;
    orphans: 3;
    widows: 3;
}

/* ========================================
   COVER — Compact 1/3 page header
   ======================================== */
.cover {
    background: linear-gradient(160deg, #0f172a 0%, #1e293b 45%, #0f172a 100%);
    padding: 36px 44px 40px 44px;
    margin: 0 -20mm;
    margin-top: 0;
    color: #fff;
    position: relative;
    overflow: hidden;
    margin-bottom: 28px;
}

.cover::before {
    content: "";
    position: absolute;
    top: -40%;
    right: -20%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%);
    border-radius: 50%;
}

.cover-top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
}

.cover-logo {
    height: 28px;
}

.cover-brand {
    font-size: 12pt;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.01em;
}

.cover-accent-line {
    width: 40px;
    height: 3px;
    background: #0ea5e9;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
}

.cover-title {
    font-size: 24pt;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 8px;
    color: #fff;
    position: relative;
    z-index: 1;
}

.cover-subtitle {
    font-size: 11pt;
    font-weight: 400;
    color: #0ea5e9;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
}

.cover-meta {
    font-size: 8pt;
    color: #64748b;
    position: relative;
    z-index: 1;
}

.cover-meta span { color: #94a3b8; }

/* ========================================
   HEADINGS
   ======================================== */
h1 {
    font-size: 18pt;
    font-weight: 800;
    color: #0f172a;
    margin-top: 28px;
    margin-bottom: 6px;
    letter-spacing: -0.02em;
    line-height: 1.2;
    page-break-after: avoid;
}

h2 {
    font-size: 13pt;
    font-weight: 700;
    color: #0f172a;
    margin-top: 24px;
    margin-bottom: 8px;
    letter-spacing: -0.01em;
    line-height: 1.25;
    page-break-after: avoid;
    padding-bottom: 5px;
    border-bottom: 2px solid #0ea5e9;
}

h3 {
    font-size: 9pt;
    font-weight: 700;
    color: #0ea5e9;
    margin-top: 16px;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

h4 {
    font-size: 9.5pt;
    font-weight: 600;
    color: #1e293b;
    margin-top: 12px;
    margin-bottom: 4px;
}

/* ========================================
   BODY TEXT
   ======================================== */
p {
    margin-bottom: 7px;
    color: #475569;
}

strong { font-weight: 600; color: #1e293b; }

/* ========================================
   LISTS — proper spacing
   ======================================== */
ul, ol {
    margin-bottom: 10px;
    padding-left: 16px;
}

li {
    margin-bottom: 4px;
    color: #475569;
    padding-left: 2px;
}

li strong { color: #0f172a; }

/* Nested lists */
li ul, li ol {
    margin-top: 3px;
    margin-bottom: 3px;
}

/* ========================================
   HORIZONTAL RULES
   ======================================== */
hr {
    border: none;
    height: 1px;
    background: linear-gradient(90deg, #0ea5e9 0%, #0ea5e9 20%, #e2e8f0 20%, #e2e8f0 100%);
    margin: 20px 0;
}

/* ========================================
   CODE
   ======================================== */
code {
    font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
    font-size: 8pt;
    background: #f1f5f9;
    padding: 1px 4px;
    border-radius: 2px;
    color: #0f172a;
}

pre {
    background: #0f172a;
    color: #e2e8f0;
    padding: 14px 18px;
    border-radius: 4px;
    margin-bottom: 12px;
    font-size: 7.5pt;
    line-height: 1.5;
    overflow-x: auto;
    page-break-inside: avoid;
    border-left: 3px solid #0ea5e9;
}

pre code {
    background: none;
    padding: 0;
    color: #e2e8f0;
    border-radius: 0;
    font-size: 7.5pt;
}

/* ========================================
   TABLES
   ======================================== */
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 12px;
    font-size: 8.5pt;
    page-break-inside: avoid;
}

th {
    background: #0f172a;
    color: #fff;
    padding: 7px 10px;
    text-align: left;
    font-weight: 600;
    font-size: 7.5pt;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

td {
    padding: 6px 10px;
    border-bottom: 1px solid #e2e8f0;
    color: #475569;
}

tr:nth-child(even) td { background: #f8fafc; }

/* ========================================
   BLOCKQUOTES
   ======================================== */
blockquote {
    border-left: 3px solid #0ea5e9;
    padding: 8px 14px;
    margin: 12px 0;
    background: #f0f9ff;
    color: #1e293b;
    border-radius: 0 3px 3px 0;
}

blockquote p { margin-bottom: 0; color: #334155; }

/* ========================================
   LINKS
   ======================================== */
a { color: #0ea5e9; text-decoration: none; }

/* ========================================
   PAGE BREAK CONTROL
   ======================================== */
h2, h3, h4 {
    page-break-after: avoid;
}

table, pre, blockquote {
    page-break-inside: avoid;
}

/* Keep heading + first paragraph + list together */
h2 + p,
h3 + p,
h3 + ul,
h3 + table,
h2 + table {
    page-break-before: avoid;
}

/* Each major section should try to stay together */
h2 ~ h3 {
    page-break-before: auto;
}
"""


def build_html(md_content: str) -> str:
    """Convert markdown to branded HTML with compact cover."""
    html_body = markdown.markdown(
        md_content,
        extensions=["tables", "fenced_code", "sane_lists"],
    )

    # Extract the first H1 for the cover title
    h1_match = re.search(r"<h1>(.*?)</h1>", html_body)
    cover_title = h1_match.group(1) if h1_match else "Project Deliverable"
    if h1_match:
        html_body = html_body.replace(h1_match.group(0), "", 1)

    # Split on em-dash for two-line title
    cover_title_lines = cover_title.split("—")
    if len(cover_title_lines) > 1:
        cover_title_html = (
            f"{cover_title_lines[0].strip()}<br/>"
            f"<span style='font-size:14pt; font-weight:400; color:#94a3b8;'>"
            f"— {cover_title_lines[1].strip()}</span>"
        )
    else:
        cover_title_html = cover_title

    logo_uri = LOGO_PATH.resolve().as_uri() if LOGO_PATH.exists() else ""
    logo_html = f'<img class="cover-logo" src="{logo_uri}" />' if logo_uri else ""
    today = date.today()
    date_formatted = today.strftime("%B %Y")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <style>{BRAND_CSS}</style>
</head>
<body>
    <!-- COVER — compact 1/3 page -->
    <div class="cover">
        <div class="cover-top">
            {logo_html}
            <span class="cover-brand">All Done Sites</span>
        </div>
        <div class="cover-accent-line"></div>
        <div class="cover-title">{cover_title_html}</div>
        <div class="cover-subtitle">Project Deliverable Report</div>
        <div class="cover-meta">
            <span>Prepared:</span> {date_formatted} &nbsp;&bull;&nbsp;
            <span>Version:</span> 1.0 &nbsp;&bull;&nbsp;
            <span>Status:</span> Complete
        </div>
    </div>

    <!-- CONTENT -->
    {html_body}
</body>
</html>"""


def main():
    parser = argparse.ArgumentParser(description="Convert Markdown to branded PDF")
    parser.add_argument("input", help="Path to the .md file")
    parser.add_argument("-o", "--output", help="Output PDF path")
    args = parser.parse_args()

    input_path = Path(args.input)
    if not input_path.exists():
        print(f"Error: {input_path} not found")
        sys.exit(1)

    output_path = Path(args.output) if args.output else input_path.with_suffix(".pdf")

    md_content = input_path.read_text(encoding="utf-8")
    html_content = build_html(md_content)

    HTML(string=html_content, base_url=str(SCRIPT_DIR.resolve())).write_pdf(
        str(output_path)
    )

    size_kb = output_path.stat().st_size / 1024
    print(f"PDF generated: {output_path}")
    print(f"Size: {size_kb:.0f} KB")


if __name__ == "__main__":
    main()
