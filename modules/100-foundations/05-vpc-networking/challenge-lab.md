# Challenge Lab: Routing and Stateful Controls

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| Cost label | `FREE-PLAN SAFE` |
| SAA-C03 | Secure, resilient, and high-performing architectures |
| Target Region | Course home Region |
| Cleanup required | Yes |

## Outcome

Design a two-tier VPC control plane without launching compute or paid networking.


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

- Name `aws-course-100-vpc-challenge`, CIDR `10.111.0.0/16`, module `100-vpc`.
- Two `/24` subnets in distinct AZs.
- Separate web and app security groups.
- Web SG permits TCP 443 only from documentation address `198.51.100.10/32`.
- App SG permits TCP 8080 only from the web SG.
- No internet gateway, NAT Gateway, Elastic IP, endpoint, or compute.
- Tag every taggable resource.

## Validate

Describe subnets, route tables, and both SGs. Prove two AZs, local-only routes, no public-IP mapping, and SG-to-SG app ingress.

## Controlled break and fix

First authorize web TCP 443 from `0.0.0.0/0`. Detect the excessive source with `describe-security-groups`, revoke that exact rule, and authorize `198.51.100.10/32` instead:

```bash
aws ec2 revoke-security-group-ingress --region "$REGION" --group-id "$WEB_SG" \
  --protocol tcp --port 443 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --region "$REGION" --group-id "$WEB_SG" \
  --protocol tcp --port 443 --cidr 198.51.100.10/32
```

The empty VPC has no compute, but an open rule is still a failed control. Explain why security groups are allow-only and when a stateless NACL deny might be considered.

## Cleanup

```bash
aws ec2 delete-security-group --region "$REGION" --group-id "$APP_SG"
aws ec2 delete-security-group --region "$REGION" --group-id "$WEB_SG"
aws ec2 disassociate-route-table --region "$REGION" --association-id "$ASSOC1"
aws ec2 disassociate-route-table --region "$REGION" --association-id "$ASSOC2"
aws ec2 delete-route-table --region "$REGION" --route-table-id "$RT"
aws ec2 delete-subnet --region "$REGION" --subnet-id "$SUBNET1"
aws ec2 delete-subnet --region "$REGION" --subnet-id "$SUBNET2"
aws ec2 delete-vpc --region "$REGION" --vpc-id "$VPC"
aws ec2 describe-vpcs --region "$REGION" --vpc-ids "$VPC"
```

Expected: `InvalidVpcID.NotFound`. Do not delete the default SG; it disappears with the VPC.
