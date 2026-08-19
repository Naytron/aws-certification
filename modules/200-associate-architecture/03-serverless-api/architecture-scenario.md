# Architecture Scenario - Image intake API

Clients upload images up to hundreds of megabytes and processing may take minutes. Users need an immediate receipt and processing status.

- **A:** Send image body through API Gateway to a long-timeout Lambda.
- **B:** API issues an S3 presigned upload URL; S3 event queues work; Lambda consumers update status.
- **C:** Keep an EC2 API waiting while a local process transforms the image.

Choose B. The object bypasses API payload constraints, queued asynchronous work absorbs bursts, and clients poll or receive status separately. Scope presigned permissions, validate content, and make processing idempotent. A couples the request to payload and duration limits; C adds idle capacity and a single-host workflow. If transformations exceed Lambda constraints, retain the S3/queue intake and use ECS tasks.
