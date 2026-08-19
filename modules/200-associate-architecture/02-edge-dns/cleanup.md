# Cleanup

1. For the recorded distribution ID, choose Disable; wait for status `Deployed`.
2. Delete that distribution only.
3. Delete the recorded OAC only after confirming no distribution uses it.
4. Run `aws s3api delete-object --bucket <exact-bucket> --key index-v1.txt` and repeat for `index-v2.txt`.
5. Run `aws s3api delete-bucket --bucket <exact-bucket> --region <region>`.
6. Verify with `aws cloudfront get-distribution --id <id>` and `aws s3api head-bucket --bucket <exact-bucket>`; expected result is NotFound.
7. Check global CloudFront, Route 53, S3, and Billing views. Never delete an unrecorded distribution, zone, OAC, or bucket.
