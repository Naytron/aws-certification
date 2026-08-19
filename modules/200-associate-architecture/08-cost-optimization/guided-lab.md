# Guided Lab - Architecture cost model

## Lab profile

**Cost label:** `DESIGN-ONLY`

`DESIGN-ONLY`; no resources. Use a spreadsheet or text table plus current public pricing pages/Pricing Calculator. Billing console observation is read-only. Do not create Cost and Usage Reports, NAT Gateways, instances, or commitments.

No resources are created by the core lab. The required tags `Course`, `Module`, `Owner`, and `ExpiresAt` apply only if an approved optional deployment is performed.

## Preflight

Confirm identity and Region, plan/credit status, budgets, and home Region. Record pricing date and currency because rates change. Use required tag keys in the proposed design.

## Model

Compare two architectures for 1,000,000 monthly API requests, average 100 ms compute, 128 MB memory, 20 GB stored objects, 100 GB internet egress, and a 24x7 low-utilization server alternative:

- A: API Gateway HTTP API, Lambda, S3.
- B: one EC2 instance, EBS, and a public IPv4 address. State clearly that B is not HA.

Use current official pricing and show every equation: quantity x rate, free allowance/credits treated separately, storage, requests, data transfer, logs, and operational assumptions. Do not claim exact future bills.

## Validate

Perform sensitivity at 10x requests and 10x duration. Add an HA requirement and show B needing at least two instances plus load balancing. Calculate cost per 1,000 requests. Identify the crossover assumptions rather than declaring one service universally cheaper.

## Break and fix

Introduce a hidden NAT Gateway and 500 GB monthly processing into A. Mark it `NOT DEPLOYED`, price hourly plus processing, and explain how an S3 gateway endpoint or architecture without private-NAT egress changes the flow. Remove it from the chosen lab design.

## Cleanup

No cloud resources were created. Verify no Pricing Calculator estimate contains secrets, no commitment was purchased, and no CUR/report/bucket was created. Check Billing inventory.

## Official references

- [AWS Pricing Calculator](https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html)
- [Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html)
- [Savings Plans](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
