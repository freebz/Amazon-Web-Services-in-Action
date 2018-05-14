// 예제 10-5 nodetodo: 사용자 추출하기(index.js)

function mapUserItem(item) {
    return {
	"uid": item.uid.S,
	"email": item.email.S,
	"phone": item.phone.S
    };
}
if (input['user'] === true) {
    var params = {
	"Key": {
	    "uid": {"S": input['<uid>']}
	},
	"TableName": "todo-user"
    };
    db.getItem(params, function(err, data) {
	if (err) {
	    console.error('error', err);
	} else {
	    if (data.Item) {
		console.log('user', mapUserItem(data.Item));
	    } else {
		console.error('user not found');
	    }
	}
    });
}
