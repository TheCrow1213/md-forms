var doc = require('dynamodb-doc');
var db = new doc.DynamoDB();

function syncUser(user, callback) {
    console.log('Syncing user context...');
    console.log(user);
    
    var params = {
        TableName: 'mdform',
        Item: user
    };
    
    db.putItem(params, function(err, data) {
        if (err) {
            console.log('ERROR!');
            callback(err, false);
        }
        else callback(null, true);
    });
}

exports.handler = (event, context, callback) => {
    
    if (event.httpMethod === 'OPTIONS') {
        // Empty request, probably an OPTIONS CORS request.
        // Might be able to remove with the right API Gateway Trigger config
        callback(null, {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } else {
        // Normal data insertion flow
        var user = JSON.parse(event.body).user
        syncUser(user, function (dbErr, success) {
          callback(null, {
                statusCode: success ? 200 : 400,
                body: JSON.stringify(success ? user : dbErr),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        });
    }
};
