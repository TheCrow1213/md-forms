export AWS_ACCESS_KEY_ID=AKIAI2NNTQCS3GUGGLGQ
export AWS_SECRET_ACCESS_KEY=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
S3_BUCKET='mdforms'

aws lambda update-function-code \
    --function-name usersController \
    --s3-bucket $S3_BUCKET \
    --s3-key 'usersController.zip'