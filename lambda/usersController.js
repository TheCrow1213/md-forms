var doc = require('dynamodb-doc');
var db = new doc.DynamoDB();

function syncUser(user, callback) {
    
    db.putItem({
        TableName: 'mdforms',
        Item: user
    }, function(err, data) {
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
