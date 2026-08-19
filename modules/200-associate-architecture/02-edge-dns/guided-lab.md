# Guided Lab - Private S3 origin through CloudFront

## Lab profile

**Cost label:** `USES CREDITS`

`USES CREDITS`; home Region; one uniquely named S3 bucket, one CloudFront distribution with OAC, two tiny text objects. No domain purchase. CloudFront is global and deletion can take several minutes.

Every created resource that supports tags must include `Course`, `Module`, `Owner`, and `ExpiresAt`.

## Preflight

Run `aws sts get-caller-identity` and `aws configure get region`; set `REGION`, a non-sensitive `OWNER`, `EXPIRES`, and `BUCKET=saa200-edge-<non-sensitive-unique-suffix>`. Confirm plan, credits, and tags. Read cleanup before continuing.

## Build

1. Create the bucket in the S3 console with all Block Public Access settings on and tags `Course=aws-solutions-architect`, `Module=200-edge`, `Owner`, and `ExpiresAt`.
2. Upload `index-v1.txt` containing `edge-lab-v1`.
3. Create a CloudFront distribution using the bucket (not website endpoint) as origin. Choose the console option to create OAC and update the bucket policy. Set default root object to `index-v1.txt`, HTTP redirect to HTTPS, and no WAF.
4. Add the four required tags to the distribution.
5. Record the distribution ID and generated domain; do not publish it.

## Validate

Request `https://<distribution-domain>/index-v1.txt` twice with `curl -I`. Record status, `x-cache`, `age`, and `via`. A direct unauthenticated S3 object URL must return AccessDenied. Confirm tags in both consoles.

## Break and fix

Upload changed content under the same key and observe that an edge response may remain cached. Fix with a new versioned key `index-v2.txt` and request it. Explain when a targeted invalidation is appropriate.

## Cleanup

Disable the named distribution, wait for Deployed, delete it, then delete its OAC if no longer referenced. Delete only `index-v1.txt` and `index-v2.txt`, then delete the named bucket. Verify the distribution ID, OAC name, and bucket no longer exist. Check Billing.

## Official references

- [Route 53 routing policies](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)
- [CloudFront cache content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ConfiguringCaching.html)
- [Restricting S3 access with OAC](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
