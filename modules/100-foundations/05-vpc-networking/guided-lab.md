# Guided Lab: Isolated Two-AZ VPC

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| SAA-C03 | Secure, resilient, and high-performing architectures |
| Cost label | `FREE-PLAN SAFE` |
| Target Region | Course home Region |
| Expected resources | One VPC, two subnets, one custom route table, one SG |
| Prohibited | NAT Gateway, internet gateway, endpoint, Elastic IP, compute |
| Cleanup required | Yes |

## Objective

Build an isolated two-AZ network and prove that subnet names do not create internet reachability.


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
export MODULE="100-vpc"
export NAME="aws-course-100-vpc"
TAGS="[{Key=Course,Value=aws-solutions-architect},{Key=Module,Value=$MODULE},{Key=Owner,Value=$OWNER},{Key=ExpiresAt,Value=$EXPIRES_AT},{Key=Name,Value=$NAME}]"
VPC=$(aws ec2 create-vpc --region "$REGION" --cidr-block 10.110.0.0/16 \
  --tag-specifications "ResourceType=vpc,Tags=$TAGS" --query Vpc.VpcId --output text)
read AZ1 AZ2 <<< $(aws ec2 describe-availability-zones --region "$REGION" \
  --filters Name=state,Values=available --query 'AvailabilityZones[0:2].ZoneName' --output text)
SUBNET1=$(aws ec2 create-subnet --region "$REGION" --vpc-id "$VPC" --cidr-block 10.110.1.0/24 \
  --availability-zone "$AZ1" --tag-specifications "ResourceType=subnet,Tags=$TAGS" \
  --query Subnet.SubnetId --output text)
SUBNET2=$(aws ec2 create-subnet --region "$REGION" --vpc-id "$VPC" --cidr-block 10.110.2.0/24 \
  --availability-zone "$AZ2" --tag-specifications "ResourceType=subnet,Tags=$TAGS" \
  --query Subnet.SubnetId --output text)
RT=$(aws ec2 create-route-table --region "$REGION" --vpc-id "$VPC" \
  --tag-specifications "ResourceType=route-table,Tags=$TAGS" --query RouteTable.RouteTableId --output text)
ASSOC1=$(aws ec2 associate-route-table --region "$REGION" --route-table-id "$RT" \
  --subnet-id "$SUBNET1" --query AssociationId --output text)
ASSOC2=$(aws ec2 associate-route-table --region "$REGION" --route-table-id "$RT" \
  --subnet-id "$SUBNET2" --query AssociationId --output text)
SG=$(aws ec2 create-security-group --region "$REGION" --group-name "$NAME" \
  --description "Isolated course security group" --vpc-id "$VPC" \
  --tag-specifications "ResourceType=security-group,Tags=$TAGS" --query GroupId --output text)
```

## Controlled break and fix

Try to create an overlapping subnet:

```bash
aws ec2 create-subnet --region "$REGION" --vpc-id "$VPC" --cidr-block 10.110.1.128/25 \
  --availability-zone "$AZ2"
```

Expected: `InvalidSubnet.Conflict`. Fix the address plan by using non-overlapping `10.110.3.0/24`, but do not create it; explain why future peering/hybrid designs also need non-overlapping VPC CIDRs.

## Validate

```bash
aws ec2 describe-subnets --region "$REGION" --subnet-ids "$SUBNET1" "$SUBNET2" \
  --query 'Subnets[].[SubnetId,AvailabilityZone,CidrBlock,MapPublicIpOnLaunch]' --output table
aws ec2 describe-route-tables --region "$REGION" --route-table-ids "$RT" \
  --query 'RouteTables[0].Routes' --output table
aws ec2 describe-security-groups --region "$REGION" --group-ids "$SG" \
  --query 'SecurityGroups[0].IpPermissions' --output json
```

Expected: different AZs, no automatic public IPv4, only the local VPC route, and no ingress rules.

## Cleanup

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

Expected: `InvalidVpcID.NotFound`. See [cleanup.md](cleanup.md) for the full inventory check.
