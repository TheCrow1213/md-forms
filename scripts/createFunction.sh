export AWS_ACCESS_KEY_ID=AKIAI2NNTQCS3GUGGLGQ
export AWS_SECRET_ACCESS_KEY=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
S3_BUCKET='mdforms'

aws lambda create-function \
    --function-name usersController \
    --role 'arn:aws:iam::605034737518:role/service-role/testLambdaRole' \
    --runtime 'nodejs4.3' \
    --handler 'usersController.handler' \
    --code S3Bucket=$S3_BUCKET,S3Key='usersController.zip'