# Guided Lab - Queue, consumer, and dead-letter evidence

## Lab profile

**Cost label:** `USES CREDITS`

`USES CREDITS`; home Region; CloudFormation stack with one Standard SQS queue, one DLQ, one Lambda consumer, event-source mapping, exact IAM role, and 1-day logs. Tiny messages only.

Every created resource that supports tags must include `Course`, `Module`, `Owner`, and `ExpiresAt`.

## Preflight

Confirm identity, Region, budget, plan, tags, and cleanup. In CloudShell save the following as `template.yaml`. The queue visibility timeout is six times the function timeout, redrive occurs after three receives, and batch size is one.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Parameters:
  Owner:
    Type: String
  ExpiresAt:
    Type: String
Resources:
  DeadLetterQueue:
    Type: AWS::SQS::Queue
    Properties:
      QueueName: saa200-messaging-dlq
      MessageRetentionPeriod: 86400
      Tags: &QueueTags
        - {Key: Course, Value: aws-solutions-architect}
        - {Key: Module, Value: 200-messaging}
        - {Key: Owner, Value: !Ref Owner}
        - {Key: ExpiresAt, Value: !Ref ExpiresAt}
  WorkQueue:
    Type: AWS::SQS::Queue
    Properties:
      QueueName: saa200-messaging-work
      VisibilityTimeout: 60
      MessageRetentionPeriod: 86400
      RedrivePolicy:
        deadLetterTargetArn: !GetAtt DeadLetterQueue.Arn
        maxReceiveCount: 3
      Tags: *QueueTags
  ConsumerLog:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: /aws/lambda/saa200-message-consumer
      RetentionInDays: 1
      Tags: *QueueTags
  ConsumerRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: saa200-message-consumer
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal: {Service: lambda.amazonaws.com}
            Action: sts:AssumeRole
      Policies:
        - PolicyName: consume-one-queue-and-log
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action: [sqs:ReceiveMessage, sqs:DeleteMessage, sqs:GetQueueAttributes, sqs:ChangeMessageVisibility]
                Resource: !GetAtt WorkQueue.Arn
              - Effect: Allow
                Action: [logs:CreateLogStream, logs:PutLogEvents]
                Resource: !Sub '${ConsumerLog.Arn}:*'
      Tags: *QueueTags
  Consumer:
    Type: AWS::Lambda::Function
    DependsOn: ConsumerLog
    Properties:
      FunctionName: saa200-message-consumer
      Runtime: python3.12
      Handler: index.handler
      Timeout: 10
      MemorySize: 128
      Role: !GetAtt ConsumerRole.Arn
      Code:
        ZipFile: |
          import json
          def handler(event, context):
              for record in event["Records"]:
                  action = json.loads(record["body"]).get("action")
                  print(json.dumps({"messageId": record["messageId"], "result": action}))
                  if action == "fail":
                      raise RuntimeError("controlled failure")
              return {"processed": len(event["Records"])}
      Tags: *QueueTags
  Mapping:
    Type: AWS::Lambda::EventSourceMapping
    Properties:
      EventSourceArn: !GetAtt WorkQueue.Arn
      FunctionName: !Ref Consumer
      BatchSize: 1
      Enabled: true
Outputs:
  WorkQueueUrl:
    Value: !Ref WorkQueue
  DeadLetterQueueUrl:
    Value: !Ref DeadLetterQueue
  ConsumerName:
    Value: !Ref Consumer
  LogGroupName:
    Value: !Ref ConsumerLog
```

Deploy with `aws cloudformation deploy --stack-name saa200-messaging --template-file template.yaml --capabilities CAPABILITY_NAMED_IAM --parameter-overrides Owner="$OWNER" ExpiresAt="$EXPIRES" --tags Course=aws-solutions-architect Module=200-messaging Owner="$OWNER" ExpiresAt="$EXPIRES"`. Record queue URLs/ARNs from outputs.

## Validate

Send one ok message by exact queue URL. Observe Lambda success and zero visible messages after processing. Send one fail message. Wait through three receives and prove it appears in the exact DLQ using `aws sqs receive-message --queue-url <dlq-url> --max-number-of-messages 1 --visibility-timeout 5`. Correlate message ID, Lambda errors, queue metrics, and DLQ evidence.

## Break and fix

Temporarily run `aws lambda put-function-concurrency --function-name saa200-message-consumer --reserved-concurrent-executions 0` and observe queued backlog without data loss. Run `aws lambda delete-function-concurrency --function-name saa200-message-consumer` and prove drain. Do not purge either queue.

## Cleanup

Receive and delete the one known DLQ message using its returned receipt handle. Delete the stack, wait, verify both exact queues/function/log group are absent, remove `template.yaml`, and check Billing.

## Official references

- [SQS visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)
- [SNS architecture](https://docs.aws.amazon.com/sns/latest/dg/welcome.html)
- [Choosing Step Functions workflows](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html)
