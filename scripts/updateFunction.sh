S3_BUCKET='mdforms'

aws lambda update-function-code \
    --function-name $LAMBDA_NAME \
    --s3-bucket $S3_BUCKET \
    --s3-key "$LAMBDA_NAME.zip"