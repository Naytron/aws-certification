# Validation

- Diagram labels Region, at least two AZs, and every stateful dependency.
- Failure matrix covers instance, AZ, dependency, deployment, and Region faults.
- RTO and RPO are numeric and mapped to a recovery mechanism.
- Health checks represent readiness and have bounded timeouts.
- Multi-AZ is not presented as Regional DR.
- Two plausible distractors are rejected by a named requirement.
- `aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE --query "StackSummaries[?starts_with(StackName, 'saa200-ha')].StackName"` returns no lab stack.
