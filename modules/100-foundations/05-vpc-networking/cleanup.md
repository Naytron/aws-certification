# Cleanup: VPC Networking

**Level:** 100 | **Cost:** `FREE-PLAN SAFE`

Delete dependency edges before containers:

```bash
aws ec2 disassociate-route-table --region "$REGION" --association-id "$ASSOC1"
aws ec2 disassociate-route-table --region "$REGION" --association-id "$ASSOC2"
aws ec2 delete-route-table --region "$REGION" --route-table-id "$RT"
aws ec2 delete-security-group --region "$REGION" --group-id "$SG"
aws ec2 delete-subnet --region "$REGION" --subnet-id "$SUBNET1"
aws ec2 delete-subnet --region "$REGION" --subnet-id "$SUBNET2"
aws ec2 delete-vpc --region "$REGION" --vpc-id "$VPC"
aws ec2 describe-vpcs --region "$REGION" --vpc-ids "$VPC"
```

Expected: `InvalidVpcID.NotFound`. For the challenge, delete the app SG before the web SG because the app rule references it. Then follow the same association, route table, subnet, VPC order. No IGW, NAT Gateway, Elastic IP, endpoint, ENI, or compute should exist for either lab.
