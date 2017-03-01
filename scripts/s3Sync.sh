export AWS_ACCESS_KEY_ID=AKIAI2NNTQCS3GUGGLGQ
export AWS_SECRET_ACCESS_KEY=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
S3_BUCKET='mdforms'

# Web Assets
echo 'Syncing web assets...'
aws s3 cp 'dist/index.html' "s3://$S3_BUCKET"
aws s3 cp 'dist/app.bundle.js' "s3://$S3_BUCKET" --content-encoding 'gzip'

# Lambda Assets
echo 'Syncing lambda assets...'
aws s3 cp 'dist/usersController.zip' "s3://$S3_BUCKET"