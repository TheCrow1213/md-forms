S3_BUCKET='mdforms'

aws lambda update-function-code \
    --function-name usersController \
    --s3-bucket $S3_BUCKET \
    --s3-key 'usersController.zip'