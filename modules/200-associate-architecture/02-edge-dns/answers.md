# Explained Answers - Edge and DNS Architecture

## 1. Which Route 53 policy gradually shifts DNS answers between endpoints?

**Answer:** Weighted routing. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 2. Why can DNS failover lag after a health change?

**Answer:** Resolvers and clients may retain answers until TTL and local caching expire. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 3. What does CloudFront OAC protect?

**Answer:** The CloudFront-to-S3 origin request, allowing the S3 REST origin to remain private. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 4. Which values belong in a cache key?

**Answer:** Only values that actually change the response for a viewer request. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 5. Why prefer versioned asset names over frequent invalidations?

**Answer:** They avoid stale-name ambiguity and repeated invalidation cost/operations. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 6. Can a Route 53 alias work at a hosted-zone apex?

**Answer:** Yes, for supported AWS targets; a conventional CNAME cannot be used at the apex. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 7. What service fits UDP acceleration with static anycast IPs?

**Answer:** AWS Global Accelerator, not CloudFront. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 8. Why is an S3 website endpoint incompatible with OAC?

**Answer:** It is treated as a custom HTTP origin rather than the authenticated S3 REST origin. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 9. What is the risk of forwarding every cookie to the origin?

**Answer:** Cache fragmentation and a low hit ratio, plus unnecessary data exposure. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 10. Does a generated CloudFront domain require Route 53?

**Answer:** No; it can be used directly for the lab. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## Review rule

For every miss, write the governing rule in your own words and apply it to a new scenario before closing the error-log entry.
