
function syncUser(user) {
    console.log('Syncing user context...');
    console.log(user);

    return true

    // pull user data from context
    // store in dynamo instance
}

exports.handler = (event, context, callback) => {
    
    callback(null, {
        "statusCode": syncUser(event.body) ? 200 : 400,
        "body": event.body,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*'
        }
    });    
};
