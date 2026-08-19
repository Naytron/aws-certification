# Cleanup: Compute and Elasticity

**Level:** 100 | **Cost:** `USES CREDITS`

Use IDs captured during the lab. Delete dependents first:

```bash
aws autoscaling update-auto-scaling-group --region "$REGION" --auto-scaling-group-name "$PREFIX" --min-size 0 --desired-capacity 0
aws autoscaling delete-auto-scaling-group --region "$REGION" --auto-scaling-group-name "$PREFIX" --force-delete
aws ec2 delete-launch-template --region "$REGION" --launch-template-name "$PREFIX"
aws ec2 delete-security-group --region "$REGION" --group-id "$SG"
aws ec2 delete-subnet --region "$REGION" --subnet-id "$SUBNET"
aws ec2 delete-vpc --region "$REGION" --vpc-id "$VPC"
```

Verify the exact ASG and launch-template names no longer resolve. Query `describe-instances` and `describe-volumes` with `Name=tag:Module,Values=100-compute`; all lab instances should be terminated and no available lab volume should remain. Review the EC2 console in the same Region. No load balancer, NAT Gateway, Elastic IP, or snapshot was created.
