# Explained Answers - Container Architecture and Selection

## 1. What is the difference between an ECS task and service?

**Answer:** A task is a running task-definition copy; a service maintains desired tasks and deployments. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 2. Which role is used by application code inside a task?

**Answer:** The task role. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 3. Which role pulls an image and delivers awslogs?

**Answer:** The task execution role. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 4. When is EKS the strongest choice?

**Answer:** When Kubernetes APIs or ecosystem capabilities are hard requirements worth the cost and operations. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 5. Why pin an image digest?

**Answer:** It identifies immutable content and prevents a tag from changing deployed bits. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 6. When can ECS on EC2 beat Fargate architecturally?

**Answer:** When host control, specialized hardware, or steady fleet economics are required. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 7. Why is one task across one AZ not highly available?

**Answer:** A task or AZ failure removes all service capacity. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 8. Where should task credentials come from?

**Answer:** Temporary credentials provided through a least-privilege task role. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 9. Does an image vulnerability scan replace patching?

**Answer:** No; findings must drive base/dependency updates and runtime controls. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 10. Why is EKS not deployed in this track?

**Answer:** Its control plane is a continuing paid resource and unnecessary for the learning objective. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## Review rule

For every miss, write the governing rule in your own words and apply it to a new scenario before closing the error-log entry.
