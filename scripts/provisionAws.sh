#!/bin/bash
REGION='us-west-2'
ROLE_NAME='formsRole'
S3_BUCKET='mdforms'
DB_TABLE_NAME='mdforms'
API_NAME='mdforms'
API_ENV='development'
LAMBDA_NAME='usersController'

## TODO output final api url: https://<api_id>.execute-api.<region>.amazonaws.com/<api_env>

./scripts/syncLambdaS3.sh

echo 'Creating role...'
ROLE_ARN=$(aws iam create-role \
    --role-name $ROLE_NAME \
    --assume-role-policy-document file://./scripts/policy.json \
    --query 'Role.Arn' --output text)

echo 'Attach DynamoDB access to role...'
aws iam attach-role-policy \
    --role-name $ROLE_NAME \
    --policy-arn 'arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess'

echo 'Attach Lambda policy...'
aws iam attach-role-policy \
    --role-name $ROLE_NAME \
    --policy-arn 'arn:aws:iam::aws:policy/AWSLambdaExecute'

echo 'Attach API Gateway policy...'
aws iam attach-role-policy \
    --role-name $ROLE_NAME \
    --policy-arn 'arn:aws:iam::aws:policy/AmazonAPIGatewayInvokeFullAccess'

echo 'Creating Lambda...'
echo $ROLE_ARN
sleep 6s # http://stackoverflow.com/questions/36419442/the-role-defined-for-the-function-cannot-be-assumed-by-lambda
LAMBDA_ARN=$(aws lambda create-function \
    --function-name $LAMBDA_NAME \
    --role $ROLE_ARN \
    --runtime 'nodejs4.3' \
    --handler "$LAMBDA_NAME.handler" \
    --region $REGION \
    --code S3Bucket=$S3_BUCKET,S3Key="$LAMBDA_NAME.zip"\
    --query 'FunctionArn' --output text)

echo 'Creating Api Gateway...'
API_ID=$(aws apigateway create-rest-api \
    --name $API_NAME\
    --query 'id' --output text)

PARENT_ID=$(aws apigateway get-resources \
    --rest-api-id $API_ID \
    --query 'items[0].id' --output text)

RESOURCE_ID=$(aws apigateway create-resource \
    --rest-api-id $API_ID \
    --parent-id $PARENT_ID \
    --path-part $LAMBDA_NAME \
    --region $REGION \
    --query 'id' --output text)

echo "Adding Lambda integration to Api Gateway..."
aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method POST \
    --region $REGION \
    --authorization-type "NONE" --no-api-key-required
    ## TODO Add authorization and api key

aws apigateway put-integration \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method POST \
    --type 'AWS' \
    --integration-http-method ANY \
    --uri "arn:aws:apigateway:$REGION:lambda:path//2015-03-31/functions/$LAMBDA_ARN/invocations" \
    --region $REGION

aws apigateway put-method-response \
    --region $REGION \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method POST \
    --status-code 200 \
    --response-models "{\"application/json\": \"Empty\"}" \
    --response-parameters '{"method.response.header.Access-Control-Allow-Origin": true}'

aws apigateway put-integration-response \
    --region $REGION \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method POST \
    --status-code 200 \
    --response-templates "{\"application/json\": \"\"}" \
    --response-parameters '{"method.response.header.Access-Control-Allow-Origin":"'"'*'"'"}'

echo "Enabling CORS on Api Gateway..."
aws apigateway put-method \
    --region $REGION \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method OPTIONS \
    --authorization-type "NONE" --no-api-key-required

aws apigateway put-integration \
    --region $REGION \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method OPTIONS \
    --request-templates '{ "application/json": "{\"statusCode\": 200}" }' \
    --type MOCK

aws apigateway put-method-response \
    --region $REGION \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method OPTIONS \
    --status-code 200 \
    --response-parameters '{"method.response.header.Access-Control-Allow-Headers": true, "method.response.header.Access-Control-Allow-Methods": true, "method.response.header.Access-Control-Allow-Origin": true}' \
    --response-models "{\"application/json\": \"Empty\"}"

aws apigateway put-integration-response \
    --region $REGION \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method OPTIONS \
    --status-code 200 \
    --response-templates "{\"application/json\": \"\"}" \
    --response-parameters '{"method.response.header.Access-Control-Allow-Origin":"'"'*'"'","method.response.header.Access-Control-Allow-Headers":"'"'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"'","method.response.header.Access-Control-Allow-Methods":"'"'POST,OPTIONS'"'"}'

echo "Deploying api..."
aws apigateway create-deployment \
    --rest-api-id $API_ID \
    --stage-name $API_ENV

echo 'Setting invoke permissions...'
aws lambda add-permission \
    --function-name $LAMBDA_ARN \
    --statement-id $(uuidgen) \
    --action lambda:InvokeFunction \
    --principal apigateway.amazonaws.com

echo 'Allocating DynamoDB Table...'
aws dynamodb create-table \
    --attribute-definitions 'AttributeName=id,AttributeType=S' \
    --key-schema 'AttributeName=id,KeyType=HASH' \
    --provisioned-throughput 'ReadCapacityUnits=5,WriteCapacityUnits=5' \
    --table-name $DB_TABLE_NAME