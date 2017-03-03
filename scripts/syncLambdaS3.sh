#!/bin/bash
S3_BUCKET='mdforms'

echo 'Collecting lambda functions...'
pushd lambda
zip usersController.zip usersController.js
mv *.zip ../dist/
popd

# Lambda Assets
echo 'Syncing lambda assets...'
aws s3 cp 'dist/usersController.zip' "s3://$S3_BUCKET"