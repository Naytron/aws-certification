# Cleanup

This module is design-only.

1. Confirm no EC2, EBS, load balancer, NAT Gateway, CUR/report bucket, or Cost Explorer export was created.
2. Confirm no Savings Plan, Reserved Instance, or Marketplace contract was purchased.
3. Remove local estimates containing non-public identifiers; keep sanitized equations.
4. Review the existing zero-spend and monthly budgets without changing unrelated configuration.
5. Check Billing and Free Tier usage. Never delete an existing report or budget you did not create.
