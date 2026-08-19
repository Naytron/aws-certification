# Cleanup

Core lab:

1. Delete only local `taskdef.json` and `skeleton.json`.
2. If pulled locally, remove the exact image digest with `docker image rm <digest>`.
3. Verify `aws ecs list-clusters`, `aws ecr describe-repositories`, and `aws eks list-clusters` contain no lab-named resource.

Optional sandbox only: scale the exact service to zero, delete it with its exact cluster/name, wait for tasks to stop, delete the exact cluster and log group, deregister only revisions in the lab family, and check ENIs. Never run bulk deregistration or repository deletion. Check Billing.
