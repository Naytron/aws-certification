# Create an AWS Free-Plan Learning Account

## Current Free-plan facts

According to the current AWS Free Tier plan documentation:

- A new customer receives USD 100 in credits after account creation.
- Up to USD 100 in additional credits can be earned through listed activities.
- The Free account plan ends when its credits are used or after six months, whichever happens first.
- The Free plan does not incur charges while it remains a Free plan.
- The account closes automatically when the plan ends unless it is upgraded.
- AWS retains content for 90 days after closure before permanent deletion.
- Joining AWS Organizations or setting up Control Tower automatically upgrades the account to a Paid plan.
- The Free plan provides only selected services and features. A Paid plan provides broader access and pay-as-you-go usage beyond credits.

Always recheck the [official plan comparison](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html) before signup because eligibility and offers can change.

## Choose the right two accounts

Create two separate identities:

1. **AWS account** - the cloud account where safe course labs run.
2. **AWS Skill Builder account** - the learning portal for official digital courses and optional sandbox content.

Skill Builder registration does not replace an AWS cloud account. A Skill Builder subscription is optional for this course.

## Before signup

Prepare:

- A dedicated email address you will keep secure
- A strong unique password stored in a password manager
- A phishing-resistant passkey or security key if available, otherwise an authenticator app
- A phone number and payment method required by AWS verification
- A private place to record the root email, recovery details, and MFA recovery plan

Do not use an employer-owned email or payment method for a personal learning account.

## Create the account

1. Open [AWS Free Tier](https://aws.amazon.com/free/) and choose the option to create an account.
2. Use the dedicated email and a neutral account name.
3. Complete contact, payment, phone, and support-plan verification.
4. Select the **Free account plan**, not the Paid account plan.
5. Sign in only after account activation completes.
6. Confirm the Billing console shows:
   - Free plan
   - Credit balance
   - Plan expiration information
7. Save a reminder to review the plan status and credits during every study cycle.

If the console does not show the Free plan you expected, stop before deploying resources and review the account plan with AWS Support.

## Choose one home Region

Use one home Region for nearly all labs. `us-east-1` has broad service availability and is the course default, but a nearer Region is acceptable if every required service is available there.

Record the choice without recording the account number:

```text
Course home Region: us-east-1
```

Region discipline matters because resources left in a different Region are easy to miss during cleanup.

## Free-plan restrictions for this course

Never enable these in the learning account unless you intentionally decide to upgrade:

- AWS Organizations
- AWS Control Tower
- Features or purchases marked unavailable to the Free plan

Professional-level modules teach these through policy exercises, CloudFormation/Terraform review, diagrams, and optional managed sandboxes. A design-only exercise can still be hands-on without creating a billable organization.

## Earned credits

The Billing console lists activities that can earn additional credits. Treat them as optional:

- Complete only activities that support the course.
- Read any resource and billing effects first.
- Remove resources after the activity.
- Confirm the credit appears rather than assuming it will.

## Completion gate

Continue only when:

- The Billing console identifies the account as a Free plan.
- You know the credit balance and plan end condition.
- You selected a home Region.
- You understand that Organizations and Control Tower trigger a Paid-plan upgrade.
- You have not deployed any resources.

## Official references

- [Choosing an AWS Free Tier plan](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [Tracking AWS Free Tier usage](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/tracking-free-tier-usage.html)
