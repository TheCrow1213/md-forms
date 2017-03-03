#!/bin/bash
echo 'Collecting lambda functions...'
pushd lambda
zip "$LAMBDA_NAME.zip" "$LAMBDA_NAME.js"
mv *.zip ../dist/
popd

# Lambda Assets
echo 'Syncing lambda assets...'
aws s3 cp "dist/$LAMBDA_NAME.zip" "s3://$S3_BUCKET"