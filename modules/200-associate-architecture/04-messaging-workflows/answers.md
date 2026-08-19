# Explained Answers - Messaging and Workflow Architecture

## 1. Which service buffers jobs for competing consumers?

**Answer:** Amazon SQS. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 2. What delivery assumption should a Standard queue consumer make?

**Answer:** At-least-once delivery, so duplicates are possible. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 3. What does SQS visibility timeout control?

**Answer:** How long a received message stays hidden before deletion or renewed availability. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 4. What is a DLQ's purpose?

**Answer:** Isolate repeatedly failing messages for diagnosis and controlled replay. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 5. When should SNS subscribers receive through separate queues?

**Answer:** When each needs independent durability, retry, and backpressure. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 6. What is EventBridge especially good at?

**Answer:** Content-based event routing among decoupled producers and targets. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 7. What does Step Functions add to a saga?

**Answer:** Durable state, ordering, retries, catches, history, and explicit compensation. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 8. Where does FIFO ordering apply?

**Answer:** Within a message group, not automatically as one global scalable order. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 9. When should an SQS message be deleted?

**Answer:** Only after the associated business work succeeds. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 10. Why is transport deduplication insufficient alone?

**Answer:** A business side effect still needs a durable idempotency check across retries. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## Review rule

For every miss, write the governing rule in your own words and apply it to a new scenario before closing the error-log entry.
