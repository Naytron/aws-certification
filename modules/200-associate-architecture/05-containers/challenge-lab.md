# Challenge Lab - Runtime selection defense

## Lab profile

**Cost label:** `DESIGN-ONLY`

No resources are created by the core `DESIGN-ONLY` challenge. The required tags `Course`, `Module`, `Owner`, and `ExpiresAt` apply only if an approved optional deployment occurs.

## Preflight

1. Run `aws sts get-caller-identity`; do not record the account ID.
2. Run `aws configure get region` and confirm the course home Region.
3. Confirm the Free-plan/credit status and budget alerts.
4. Read `cleanup.md` before any approved optional deployment.

## Challenge

Choose platforms for: a bursty 2-second event handler, a steady HTTP container, a GPU batch, and a team requiring Kubernetes custom controllers.

For each, compare Lambda, ECS Fargate, ECS EC2, App Runner, and EKS on operational control, scaling unit, startup behavior, networking, HA, security roles, and cost shape. Then review a deliberately weak task definition for mutable image, root, excess IAM, unbounded logs, missing health, and single-AZ placement.

Perform preflight and prove no cloud resources were created. Pass only when EKS is selected because a Kubernetes requirement exists, not merely because the artifact is a container.

## Validate

Confirm every stated pass condition with a diagram, decision table, or observable inventory result. Verify that no AWS resources were created for the core challenge and that any optional deployment uses the four required tags.

## Cleanup

Remove only local review artifacts that are no longer needed and run every inventory check in [cleanup](cleanup.md). Do not deregister task definitions or delete clusters you did not create.

## Official references

- [Amazon ECS components](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)
- [ECS task IAM roles](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html)
- [ECS task definition parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html)
