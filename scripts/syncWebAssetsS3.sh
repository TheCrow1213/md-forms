#!/bin/bash
S3_BUCKET='mdforms'

# Web Assets
echo 'Syncing web assets...'
aws s3 cp 'dist/index.html' "s3://$S3_BUCKET"
aws s3 cp 'dist/app.bundle.js' "s3://$S3_BUCKET" --content-encoding 'gzip'