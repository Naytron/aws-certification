# Cleanup: Storage

**Level:** 100 | **Cost:** `FREE-PLAN SAFE`

Versioned buckets require version-aware deletion:

```bash
aws s3api delete-bucket-policy --bucket "$BUCKET"
aws s3api list-object-versions --bucket "$BUCKET" --output json > versions.json
```

Inspect `versions.json`. For every item under `Versions`, run `delete-object --bucket "$BUCKET" --key <exact-key> --version-id <exact-version-id>`. Repeat for every item under `DeleteMarkers`. Then:

```bash
aws s3api delete-bucket-lifecycle --bucket "$BUCKET"
aws s3api delete-bucket --bucket "$BUCKET" --region "$REGION"
aws s3api head-bucket --bucket "$BUCKET"
rm -f lifecycle.json policy.json object.txt blocked.txt versions.json
```

Expected: `404`/`Not Found`. Repeat only for the exact challenge bucket if used. Verify no multipart uploads with `list-multipart-uploads --bucket "$BUCKET"` before bucket deletion. Review S3 buckets globally; names are global even though each bucket has one Region.
