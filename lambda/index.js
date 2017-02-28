
exports.handler = (event, context, callback) => {
    console.log(event);
    console.log(context);
    
    var response = {
        message: "Hello there!"
    };
    
    callback(null, {
        "statusCode": 200,
        "body": JSON.stringify(response)
    });
};
