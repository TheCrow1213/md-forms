export AWS_ACCESS_KEY_ID=AKIAI2NNTQCS3GUGGLGQ
export AWS_SECRET_ACCESS_KEY=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

FUNCTION_NAME='testAutomate'
ROLE='arn:aws:iam::605034737518:role/service-role/testLambdaRole'
DESCRIPTION="Script to perform the stuff needed for this app"

zip -r index lambda/index.js 
aws lambda create-function \
    --function-name $FUNCTION_NAME \
    --role $ROLE \
    --runtime 'nodejs4.3' \
    --handler 'index.handler' \
    --zip-file 'fileb://index.zip'