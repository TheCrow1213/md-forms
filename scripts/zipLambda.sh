pushd lambda
zip usersController.zip usersController.js
mv *.zip ../dist/
popd