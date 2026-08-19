# Challenge Lab: Capacity Bounds

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| Cost label | `USES CREDITS` |
| SAA-C03 | Resilient, high-performing, and cost-optimized architectures |
| Target Region | Course home Region |
| Cleanup required | Yes, in this session |

## Outcome

Build a one-instance disposable Auto Scaling group from a launch template, prove capacity bounds, and remove it in the same session.


## Preflight

Use AWS CloudShell so the console session supplies temporary credentials. Do not create an access key.

```bash
aws sts get-caller-identity
REGION="${AWS_REGION:-$(aws configure get region)}"
test -n "$REGION" || { echo "Set a course home Region before continuing."; exit 1; }
aws ec2 describe-regions --region-names "$REGION" --query 'Regions[0].RegionName' --output text
export OWNER="student"
export EXPIRES_AT="$(date -u -d '+4 hours' '+%Y-%m-%dT%H:%M:%SZ')"
```

Privately confirm that the caller and Region are expected. Do not paste the account ID or full ARN into evidence. Replace `OWNER` and `EXPIRES_AT` with a non-sensitive alias and a near-future UTC cleanup time.

Required tags:

| Key | Value |
| --- | --- |
| `Course` | `aws-solutions-architect` |
| `Module` | module value shown below |
| `Owner` | `$OWNER` |
| `ExpiresAt` | `$EXPIRES_AT` |

Confirm budget alerts and credit balance, then read the Cleanup section before creating resources.

## Requirements

- Use prefix `aws-course-100-compute-challenge`, module tag `100-compute`, CIDR `10.101.0.0/16`, and one `/24` subnet.
- No public IP, ingress, internet gateway, load balancer, NAT Gateway, or Elastic IP.
- Select an instance type returned by the `free-tier-eligible=true` EC2 filter.
- Use the current Amazon Linux 2023 x86_64 SSM public AMI parameter.
- Tag VPC, subnet, SG, launch template, ASG, and propagated instance.
- Start with min/max/desired `0/0/0`.

## Validate

Prove the ASG exists with zero capacity and list every required tag. Then run the break/fix.

## Controlled break and fix

Set desired capacity to 1 while maximum capacity remains 0. Capture the validation error. Correct maximum to 1 and desired to 1, wait for one `InService` instance, then immediately return desired to 0 and wait for termination.

## Cleanup

```bash
aws autoscaling delete-auto-scaling-group --region "$REGION" \
  --auto-scaling-group-name aws-course-100-compute-challenge --force-delete
aws ec2 delete-launch-template --region "$REGION" \
  --launch-template-name aws-course-100-compute-challenge
aws ec2 delete-security-group --region "$REGION" --group-id "$SG"
aws ec2 delete-subnet --region "$REGION" --subnet-id "$SUBNET"
aws ec2 delete-vpc --region "$REGION" --vpc-id "$VPC"
```

Verify with exact ASG and launch-template names, then query instances and volumes by `tag:Module=100-compute` and inspect results before deleting anything else. Do not use wildcard termination or volume deletion.
