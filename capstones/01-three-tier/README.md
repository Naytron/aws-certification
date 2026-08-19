# Capstone 01 - Secure Highly Available Three-Tier Application

## Outcome

Design and defend a production three-tier web application that survives an Availability Zone failure, protects data and administrative paths, scales horizontally, is observable, and has a tested cleanup plan.

Two variants are required:

1. **Production design (`DESIGN-ONLY`)** - ALB, Auto Scaling, and Multi-AZ relational data tier. Do not deploy expensive components in the course Free-plan account.
2. **Scaled lab (`FREE-PLAN SAFE`)** - API Gateway, Lambda, and DynamoDB demonstrate presentation, application, and data boundaries using small requests and short retention.

The scaled lab is architecture-equivalent practice, not a claim that its behavior or costs equal the production design.

## Files

1. [Requirements](requirements.md)
2. [Architecture tasks](architecture-tasks.md)
3. [Free-plan-safe scaled lab](scaled-lab.md)
4. [Failure exercise](failure-exercise.md)
5. [Validation](validation.md)
6. [Cleanup](cleanup.md)
7. [Evidence](evidence.md)
8. [Rubric](rubric.md)

## Safety rules

- Use only the course home Region.
- Before deployment, confirm the Billing console still shows the Free plan, credit balance, and service eligibility.
- Do not upgrade the plan, join Organizations, or enable Control Tower.
- Apply `Course`, `Module`, `Owner`, and `ExpiresAt` tags to every supported resource.
- Use temporary console/CloudShell credentials; create no access keys or secrets.
- Use synthetic data only.
- Do not deploy NAT Gateways, ALBs, RDS, WAF, custom domains, paid certificates, or multi-Region copies for this capstone.
- Set a short CloudWatch Logs retention and remove everything in the same study session.
- If any required scaled-lab service is unavailable to the Free plan, complete that item design-only.

## Completion gate

Score at least 80/100 with no critical failure, complete the controlled fault, and prove cleanup.

## Official references

- [Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)
- [Security Pillar](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html)
- [AWS Free plan](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)
