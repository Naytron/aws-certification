# Guided Lab - Image and task-definition analysis

## Lab profile

**Cost label:** `DESIGN-ONLY`; the ECS run is `OPTIONAL PAID/SANDBOX`

`DESIGN-ONLY`; CloudShell or local Docker if already installed; no ECR repository, ECS cluster, EKS control plane, load balancer, NAT Gateway, or running task required.

No resources are created by the core lab. The required tags `Course`, `Module`, `Owner`, and `ExpiresAt` apply only if an approved optional deployment is performed.

## Preflight

Confirm identity and Region, budgets, plan, tags, and cleanup. Check `docker version`; if unavailable, use the supplied manifest reasoning steps and do not install a daemon only for this lab.

## Analyze an image

Use the public image `public.ecr.aws/nginx/nginx:stable-alpine` only as an example. Run `docker pull` if available, record the resolved digest, then `docker image inspect <digest>` and `docker history --no-trunc <digest>`. Do not publish full environment output if it contains unexpected data. Record base family, architecture, user, entrypoint, exposed ports, image size, and mutable-tag risk.

## Analyze a task definition

Create local `taskdef.json` (do not register it) for Fargate with `awsvpc`, `requiresCompatibilities=["FARGATE"]`, explicit CPU/memory, port 8080, `readonlyRootFilesystem=true`, `user="101"`, awslogs configuration, a container health check, separate placeholder execution/task role ARNs, and four tags in a companion deployment plan. Run:

`aws ecs register-task-definition --generate-cli-skeleton input > skeleton.json`

Compare required fields; validate JSON locally with PowerShell `Get-Content taskdef.json | ConvertFrom-Json | Out-Null` or `python -m json.tool taskdef.json`.

## Validate

Record the image digest and inspection findings; validate the task-definition JSON, separate task and execution roles, and confirm that no cloud resources were created.

## Break and fix

Create a defective copy using `latest`, root, plaintext `AWS_SECRET_ACCESS_KEY`, no log configuration, and task role equal to execution role. Find every defect and produce a corrected diff. Never insert a real credential.

## Optional ECS path

`OPTIONAL PAID/SANDBOX`: only in an external sandbox with an existing VPC, create a Fargate cluster/service for one task, no load balancer, no NAT, public IP solely for the short exercise, stop within 10 minutes, then delete service and cluster. The core lab passes without running it.

## Cleanup

Remove only local `taskdef.json` and `skeleton.json` plus the optional local image. Verify no cluster, service, task definition family, ECR repository, EKS cluster, ENI, or log group was created.

## Official references

- [Amazon ECS components](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)
- [ECS task IAM roles](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html)
- [ECS task definition parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html)
