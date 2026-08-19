# Validation

- Successful message is processed and deleted only after success.
- Failed message reaches the named DLQ after the configured receive count.
- Reserved-concurrency fault creates visible backlog and recovery drains it.
- Visibility timeout exceeds processing timeout with margin.
- Consumer design is idempotent and logs identifiers, not sensitive bodies.
- Stack and exact queues, mapping, function, role, and logs are absent after cleanup.
