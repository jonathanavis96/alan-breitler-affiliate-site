# Newsletter Guide — Buttondown

Your newsletter signup is already live on aifocus.work and collecting subscribers, so the technical side is done. This short guide covers the two optional things left on your side: setting your sender details, and switching on the automated welcome series whenever you are ready.

---

## Setting your sender details (optional, 2 minutes)

In your Buttondown dashboard:

1. Go to **Settings → Newsletter**.
2. Set the **Newsletter name** to `AIfocus`.
3. Set the **From name** to `Alan` (or `Alan, AIfocus`).
4. Set the **From email** to an address you check, such as `hello@aifocus.work`, `alan@aifocus.work`, or your personal address.
5. Optionally, write a short newsletter description for your public profile page.

That is all the customisation needed. The signup form, double opt-in, and subscriber capture are already handled.

---

## Switching on the 5-email welcome series

A five-email welcome sequence has been written for you (included as the attached **Welcome Email Sequence**). It greets each new subscriber and introduces the tools over their first two weeks.

**Plan note:** the welcome series runs as a Buttondown *automation*, which is part of Buttondown's **Basic plan ($9/month)**. The signup form and your regular newsletters work on the **Free plan** at no cost, and only the automated drip needs the upgrade. There is no rush, the form is already collecting subscribers, and you can switch the series on whenever it suits you. If you would rather not pay, you can also send the five emails out manually as regular newsletters once you have enough subscribers, at no cost.

Once you are on the Basic plan, to load the sequence:

1. In Buttondown, go to **Automations → New automation**.
2. Set the trigger to **Subscriber confirms subscription**.
3. Add the five emails in order, using the subject lines and bodies from the attached Welcome Email Sequence, with these delays:

| # | Email | Delay after signup |
|---|---|---|
| 1 | Welcome | Immediate |
| 2 | The 30-minute literature review workflow | 2 days |
| 3 | The interview transcript that wrote itself | 5 days |
| 4 | Tools we use every day | 9 days |
| 5 | What's coming next | 14 days |

4. For each email, replace `{{FIRST_NAME}}` with Buttondown's first-name variable, `{{ subscriber.first_name }}`.
5. Activate the automation.

To test it, sign up with a fresh email address. You should receive email 1 immediately, email 2 two days later, and so on.

---

## Cost summary

| Plan | Includes automations? |
|------|-----------------------|
| Free (up to 100 subscribers) | No |
| Basic ($9/month) | Yes |

The Free tier runs the signup form and one-off newsletters at no cost. Basic ($9/month) is the first tier that includes automations, which the welcome series needs. Prices and limits change over time, so check buttondown.com/pricing for current details before upgrading.
