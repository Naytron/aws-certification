# Budgets and Alerts

## Important limitation

Budgets and email alerts are detectors, not hard spending caps. Data and notifications can be delayed. The Free plan avoids charges while it remains active, but credits can still be consumed. Cleanup and frequent account review remain mandatory.

## 1. Verify plan and credit monitoring

In Billing and Cost Management, locate:

- Plan type
- Credit balance
- Plan expiration condition
- Free Tier usage
- Recommended actions

Check these before each new service family and after every capstone.

## 2. Verify Free Tier usage alerts

AWS states that individual accounts receive an email at 85% of a service's Free Tier limit. Verify the preference rather than assuming it:

1. Open **Billing and Cost Management**.
2. Open **Billing preferences**.
3. Edit alert preferences.
4. Enable **Receive AWS Free Tier alerts**.
5. Confirm the destination email.

Keep the root email monitored even if an additional billing contact is configured.

## 3. Create a zero-spend budget

Create the AWS-provided **Zero spend budget** template:

1. Open **Budgets**.
2. Choose the simplified template workflow.
3. Select **Zero spend budget**.
4. Send alerts to an address you actively monitor.
5. Give it a clear name such as `course-zero-spend`.

This catches usage that produces cost outside free limits. It does not stop resources automatically.

## 4. Create a low monthly cost budget

Add a custom monthly cost budget:

- Name: `course-monthly-cost`
- Budget amount: a deliberately low personal threshold
- Actual alert: an early threshold
- Forecast alert: a second early threshold
- Email: the actively monitored address

For strict learning use, a USD 5 budget with alerts well before 100% is reasonable. A budget is not permission to spend the full amount.

Review advanced options so credits, refunds, and other adjustments are treated intentionally. The goal is to notice gross resource usage and credit depletion, not to hide it behind credits.

## 5. Create service-specific usage budgets when needed

Before a lab that approaches a service limit, create a usage budget for that service. Good candidates include:

- EC2 running hours
- EBS storage
- S3 storage and requests
- RDS instance hours
- CloudWatch custom metrics or logs
- Data transfer

The lab must state the unit and threshold. Remove stale usage budgets when they no longer help.

## 6. Daily cost-control routine

At the start:

1. Confirm plan and credit balance.
2. Review budget status and Free Tier recommendations.
3. Review open resources in the home Region.
4. Review the lab's cost label.

At the end:

1. Delete lab resources.
2. Check CloudFormation stacks and service consoles.
3. Check other Regions used by the lab.
4. Review budget and usage views.
5. Record cleanup evidence.

## 7. Alert response

If any alert arrives:

1. Stop new deployments.
2. Identify the service, Region, and resource.
3. Preserve only evidence needed to troubleshoot.
4. Delete or stop the resource safely.
5. Check related resources such as EBS volumes, snapshots, Elastic IP addresses, NAT Gateways, load balancers, and log groups.
6. Recheck usage after billing data updates.
7. Record the root cause and prevention in the lab evidence.

If the charge or usage is unexplained, contact AWS Support through the account rather than ignoring it.

## Completion gate

- Free Tier usage alerts are enabled.
- A zero-spend budget exists.
- A low monthly cost budget exists.
- Alert email delivery is confirmed where AWS provides a confirmation flow.
- You can explain why budgets do not guarantee zero spend.

## Official references

- [Tracking AWS Free Tier usage](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/tracking-free-tier-usage.html)
- [Creating an AWS Budget](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-create.html)
- [Managing costs with AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html)
