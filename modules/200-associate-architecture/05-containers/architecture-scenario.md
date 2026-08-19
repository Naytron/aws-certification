# Architecture Scenario - Batch renderer

A renderer uses GPUs for six predictable hours nightly. The team has no Kubernetes skills and needs queue-based scaling and control of optimized GPU instances.

- **A:** EKS managed node groups because the renderer is containerized.
- **B:** ECS on EC2 GPU capacity, SQS-driven scaling, immutable ECR digest, task role, and managed draining.
- **C:** Fargate tasks requesting GPUs.

Choose B. It meets specialized host and schedule needs without Kubernetes control-plane overhead. A adds an unjustified platform; C does not satisfy the GPU requirement. If the workload becomes CPU-only, sporadic, and short, reassess Fargate.
