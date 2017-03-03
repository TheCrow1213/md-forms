var doc = require('dynamodb-doc');
var db = new doc.DynamoDB();

function syncUser(user, callback) {
    console.log('Syncing user context...');
    console.log(user);
    
    var params = {
        TableName: 'mdforms',
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

    var user = event.user
    syncUser(user, function (dbErr, success) {
      callback(null, success ? user : dbErr);
    });
};
