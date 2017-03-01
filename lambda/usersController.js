
function newUser(context) {
    console.log(context);

    // pull userid from context
    // store in dynamo instance
}

exports.handler = (event, context, callback) => {
    newUser(context);
    
    var response = {
        message: "Hello there! :)"
    };
    
    callback(null, {
        "statusCode": 200,
        "body": JSON.stringify(response)
    });
};
