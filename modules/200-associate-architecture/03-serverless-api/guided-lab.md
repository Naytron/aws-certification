# Guided Lab - Observable serverless echo API

## Lab profile

**Cost label:** `USES CREDITS`

`USES CREDITS`; home Region; one CloudFormation stack containing an HTTP API, one Lambda function, one execution role, and one short-retention log group. No VPC, NAT Gateway, database, custom domain, or secret.

Every created resource that supports tags must include `Course`, `Module`, `Owner`, and `ExpiresAt`.

## Preflight

Run `aws sts get-caller-identity` and `aws configure get region`. Confirm budget and plan. Set `OWNER` and an ISO-8601 `EXPIRES`. Read cleanup. In CloudShell save this as `template.yaml`:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Parameters:
  Owner:
    Type: String
  ExpiresAt:
    Type: String
Resources:
  EchoLog:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: /aws/lambda/saa200-echo
      RetentionInDays: 1
      Tags:
        - {Key: Course, Value: aws-solutions-architect}
        - {Key: Module, Value: 200-serverless}
        - {Key: Owner, Value: !Ref Owner}
        - {Key: ExpiresAt, Value: !Ref ExpiresAt}
  EchoRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: saa200-serverless-echo
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal: {Service: lambda.amazonaws.com}
            Action: sts:AssumeRole
      Policies:
        - PolicyName: exact-log-write
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action: [logs:CreateLogStream, logs:PutLogEvents]
                Resource: !Sub '${EchoLog.Arn}:*'
      Tags:
        - {Key: Course, Value: aws-solutions-architect}
        - {Key: Module, Value: 200-serverless}
        - {Key: Owner, Value: !Ref Owner}
        - {Key: ExpiresAt, Value: !Ref ExpiresAt}
  EchoFunction:
    Type: AWS::Lambda::Function
    DependsOn: EchoLog
    Properties:
      FunctionName: saa200-echo
      Runtime: python3.12
      Handler: index.handler
      Timeout: 5
      MemorySize: 128
      Role: !GetAtt EchoRole.Arn
      Code:
        ZipFile: |
          import json
          def handler(event, context):
              http = event.get("requestContext", {}).get("http", {})
              return {"statusCode": 200, "headers": {"content-type": "application/json"},
                      "body": json.dumps({"method": http.get("method"),
                                          "path": http.get("path"),
                                          "requestId": event.get("requestContext", {}).get("requestId")})}
      Tags:
        - {Key: Course, Value: aws-solutions-architect}
        - {Key: Module, Value: 200-serverless}
        - {Key: Owner, Value: !Ref Owner}
        - {Key: ExpiresAt, Value: !Ref ExpiresAt}
  Api:
    Type: AWS::ApiGatewayV2::Api
    Properties:
      Name: saa200-echo
      ProtocolType: HTTP
      Tags:
        Course: aws-solutions-architect
        Module: 200-serverless
        Owner: !Ref Owner
        ExpiresAt: !Ref ExpiresAt
  Integration:
    Type: AWS::ApiGatewayV2::Integration
    Properties:
      ApiId: !Ref Api
      IntegrationType: AWS_PROXY
      IntegrationUri: !GetAtt EchoFunction.Arn
      PayloadFormatVersion: '2.0'
  Route:
    Type: AWS::ApiGatewayV2::Route
    Properties:
      ApiId: !Ref Api
      RouteKey: GET /echo
      Target: !Join ['/', [integrations, !Ref Integration]]
  Stage:
    Type: AWS::ApiGatewayV2::Stage
    Properties:
      ApiId: !Ref Api
      StageName: '$default'
      AutoDeploy: true
      Tags:
        Course: aws-solutions-architect
        Module: 200-serverless
        Owner: !Ref Owner
        ExpiresAt: !Ref ExpiresAt
  InvokePermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName: !Ref EchoFunction
      Principal: apigateway.amazonaws.com
      SourceArn: !Sub 'arn:${AWS::Partition}:execute-api:${AWS::Region}:${AWS::AccountId}:${Api}/*/GET/echo'
Outputs:
  EchoUrl:
    Value: !Sub 'https://${Api}.execute-api.${AWS::Region}.${AWS::URLSuffix}/echo'
  ApiId:
    Value: !Ref Api
  FunctionName:
    Value: !Ref EchoFunction
  LogGroupName:
    Value: !Ref EchoLog
```

## Build

1. The handler must return request method, path, and `requestContext.requestId`; never echo authorization headers.
2. The role needs only basic log permissions. Add `AWS::Lambda::Permission` scoped to the API execution ARN.
3. Deploy exactly: `aws cloudformation deploy --stack-name saa200-serverless-api --template-file template.yaml --capabilities CAPABILITY_NAMED_IAM --parameter-overrides Owner="$OWNER" ExpiresAt="$EXPIRES" --tags Course=aws-solutions-architect Module=200-serverless Owner="$OWNER" ExpiresAt="$EXPIRES"`.
4. Read the generated endpoint from stack outputs.

## Validate

Call `curl -i "<endpoint>/echo"` and record status, JSON, and request ID. Call a nonexistent route and distinguish the 404 from a Lambda error. Inspect the named log group with `aws logs tail <exact-log-group> --since 10m`. Verify stack/resource tags and Lambda configuration.

## Break and fix

Change the handler to raise an exception, redeploy, and observe the 5xx and log traceback. Restore the handler, redeploy, and prove a 200 response. Explain why client retry of a non-idempotent write would require a token.

## Cleanup

Delete only stack `saa200-serverless-api`, wait for `DELETE_COMPLETE`, then verify the exact API, function, role, and log group are absent. Remove local `template.yaml`. Check Billing.

## Official references

- [API Gateway HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)
- [Lambda quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html)
- [Lambda best practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
