# Guided Lab: Observe Auto Scaling Replacement

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| SAA-C03 | Resilient, high-performing, and cost-optimized architectures |
| Cost label | `USES CREDITS` |
| Target Region | Course home Region |
| Expected resources | One VPC/subnet/SG, launch template, ASG, at most one short-lived EC2 instance |
| Prohibited | Load balancer, NAT Gateway, Elastic IP |
| Cleanup required | Yes, in this session |

## Objective

Observe an Auto Scaling launch failure, fix the launch template, reach one `InService` instance, and return capacity to zero.


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

## Build

```bash
export MODULE="100-compute"
export PREFIX="aws-course-100-compute"
VPC=$(aws ec2 create-vpc --region "$REGION" --cidr-block 10.100.0.0/16 \
  --tag-specifications "ResourceType=vpc,Tags=[{Key=Name,Value=$PREFIX},{Key=Course,Value=aws-solutions-architect},{Key=Module,Value=$MODULE},{Key=Owner,Value=$OWNER},{Key=ExpiresAt,Value=$EXPIRES_AT}]" \
  --query Vpc.VpcId --output text)
AZ=$(aws ec2 describe-availability-zones --region "$REGION" --filters Name=state,Values=available \
  --query 'AvailabilityZones[0].ZoneName' --output text)
SUBNET=$(aws ec2 create-subnet --region "$REGION" --vpc-id "$VPC" --cidr-block 10.100.1.0/24 \
  --availability-zone "$AZ" --tag-specifications "ResourceType=subnet,Tags=[{Key=Name,Value=$PREFIX},{Key=Course,Value=aws-solutions-architect},{Key=Module,Value=$MODULE},{Key=Owner,Value=$OWNER},{Key=ExpiresAt,Value=$EXPIRES_AT}]" \
  --query Subnet.SubnetId --output text)
SG=$(aws ec2 create-security-group --region "$REGION" --group-name "$PREFIX" \
  --description "No ingress course ASG" --vpc-id "$VPC" \
  --tag-specifications "ResourceType=security-group,Tags=[{Key=Course,Value=aws-solutions-architect},{Key=Module,Value=$MODULE},{Key=Owner,Value=$OWNER},{Key=ExpiresAt,Value=$EXPIRES_AT}]" \
  --query GroupId --output text)
INSTANCE_TYPE=$(aws ec2 describe-instance-types --region "$REGION" \
  --filters Name=free-tier-eligible,Values=true \
  --query "InstanceTypes[?contains(ProcessorInfo.SupportedArchitectures, 'x86_64')]|[0].InstanceType" --output text)
test "$INSTANCE_TYPE" != "None" || { echo "No free-plan eligible type found; stop."; exit 1; }
aws ec2 create-launch-template --region "$REGION" --launch-template-name "$PREFIX" \
  --tag-specifications "ResourceType=launch-template,Tags=[{Key=Course,Value=aws-solutions-architect},{Key=Module,Value=$MODULE},{Key=Owner,Value=$OWNER},{Key=ExpiresAt,Value=$EXPIRES_AT}]" \
  --launch-template-data "{\"ImageId\":\"ami-00000000000000000\",\"InstanceType\":\"$INSTANCE_TYPE\",\"SecurityGroupIds\":[\"$SG\"],\"TagSpecifications\":[{\"ResourceType\":\"instance\",\"Tags\":[{\"Key\":\"Course\",\"Value\":\"aws-solutions-architect\"},{\"Key\":\"Module\",\"Value\":\"$MODULE\"},{\"Key\":\"Owner\",\"Value\":\"$OWNER\"},{\"Key\":\"ExpiresAt\",\"Value\":\"$EXPIRES_AT\"}]}]}"
aws autoscaling create-auto-scaling-group --region "$REGION" --auto-scaling-group-name "$PREFIX" \
  --launch-template "LaunchTemplateName=$PREFIX,Version=\$Default" \
  --min-size 0 --max-size 1 --desired-capacity 0 --vpc-zone-identifier "$SUBNET" \
  --tags ResourceId="$PREFIX",ResourceType=auto-scaling-group,Key=Course,Value=aws-solutions-architect,PropagateAtLaunch=true \
  ResourceId="$PREFIX",ResourceType=auto-scaling-group,Key=Module,Value="$MODULE",PropagateAtLaunch=true \
  ResourceId="$PREFIX",ResourceType=auto-scaling-group,Key=Owner,Value="$OWNER",PropagateAtLaunch=true \
  ResourceId="$PREFIX",ResourceType=auto-scaling-group,Key=ExpiresAt,Value="$EXPIRES_AT",PropagateAtLaunch=true
```

## Controlled break and fix

```bash
aws autoscaling update-auto-scaling-group --region "$REGION" \
  --auto-scaling-group-name "$PREFIX" --desired-capacity 1
sleep 45
aws autoscaling describe-scaling-activities --region "$REGION" \
  --auto-scaling-group-name "$PREFIX" --max-items 3 \
  --query 'Activities[].[StatusCode,StatusMessage]' --output table
```

Expected: launch failure because the AMI ID is invalid. Fix it:

```bash
AMI=$(aws ssm get-parameter --region "$REGION" \
  --name /aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64 \
  --query Parameter.Value --output text)
VERSION=$(aws ec2 create-launch-template-version --region "$REGION" \
  --launch-template-name "$PREFIX" --source-version 1 \
  --launch-template-data "{\"ImageId\":\"$AMI\"}" \
  --query LaunchTemplateVersion.VersionNumber --output text)
aws ec2 modify-launch-template --region "$REGION" --launch-template-name "$PREFIX" \
  --default-version "$VERSION"
aws autoscaling update-auto-scaling-group --region "$REGION" \
  --auto-scaling-group-name "$PREFIX" --desired-capacity 1
```

## Validate

Validate the healthy state, then scale down:

```bash
aws autoscaling wait group-in-service --region "$REGION" --auto-scaling-group-names "$PREFIX"
aws autoscaling describe-auto-scaling-groups --region "$REGION" \
  --auto-scaling-group-names "$PREFIX" \
  --query 'AutoScalingGroups[0].{Desired:DesiredCapacity,Instances:Instances[].LifecycleState,Tags:Tags[].Key}' --output json
aws autoscaling update-auto-scaling-group --region "$REGION" \
  --auto-scaling-group-name "$PREFIX" --desired-capacity 0
while [ "$(aws autoscaling describe-auto-scaling-groups --region "$REGION" \
  --auto-scaling-group-names "$PREFIX" --query 'length(AutoScalingGroups[0].Instances)' \
  --output text)" -ne 0 ]; do sleep 15; done
```

Wait until `describe-auto-scaling-groups` shows an empty `Instances` list before cleanup.

## Cleanup

```bash
aws autoscaling delete-auto-scaling-group --region "$REGION" \
  --auto-scaling-group-name "$PREFIX" --force-delete
aws ec2 delete-launch-template --region "$REGION" --launch-template-name "$PREFIX"
aws ec2 delete-security-group --region "$REGION" --group-id "$SG"
aws ec2 delete-subnet --region "$REGION" --subnet-id "$SUBNET"
aws ec2 delete-vpc --region "$REGION" --vpc-id "$VPC"
aws autoscaling describe-auto-scaling-groups --region "$REGION" \
  --auto-scaling-group-names "$PREFIX" --query AutoScalingGroups --output json
```

Expected final ASG output: `[]`. Confirm no instance or EBS volume with module tag `100-compute` remains. See [cleanup.md](cleanup.md) for the verification checklist.
