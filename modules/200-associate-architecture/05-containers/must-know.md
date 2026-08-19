# Must Know - Container Architecture and Selection

## Compute selection

| Requirement | Prefer | Tradeoff |
| --- | --- | --- |
| AWS-native container orchestration without server management | ECS on Fargate | Pay per task resources; platform constraints |
| Control instances, specialized AMIs, GPUs, or steady fleet economics | ECS on EC2 | Patch, scale, and bin-pack hosts |
| Kubernetes APIs/ecosystem are a hard requirement | EKS | Control-plane cost and Kubernetes operations; design-only here |
| Simple web container with minimal orchestration | App Runner | Less infrastructure control |
| Short event-driven code within Lambda constraints | Lambda | Do not containerize solely because a container image is supported |

An ECS **task definition** is a versioned specification; a **task** is one running copy; a **service** maintains desired tasks and can integrate with load balancing. The task execution role lets the ECS agent pull images and write logs. The task role gives application code AWS permissions. Do not merge them.

## Image and task-definition review

- Pin immutable image digests for reproducibility; mutable `latest` can change between tasks.
- Use a minimal supported base, multi-stage build, non-root user, read-only root filesystem where viable, and no embedded credentials.
- Send logs to a bounded-retention destination; define CPU/memory deliberately.
- Put secrets in Secrets Manager or Parameter Store and grant exact reads; environment variables remain visible to processes and control-plane readers.
- Configure container health checks, stop timeout, deployment minimum/maximum healthy percent, and at least two AZs for HA services.

## Common failures and distractors

- **EKS because containers:** Kubernetes must be a requirement, not a synonym.
- **Public IP for every task:** prefer private networking and controlled ingress/egress when production requirements justify the cost; this lab does not deploy NAT.
- **Execution role as app role:** excessive permissions and wrong trust boundary.
- **One task is a service:** no redundancy or rolling deployment headroom.
- **ECR scan means safe image:** scanning is one control; patching, signing/provenance, runtime controls, and least privilege still matter.

## Official references

- [Amazon ECS components](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)
- [ECS task IAM roles](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html)
- [ECS task definition parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html)
