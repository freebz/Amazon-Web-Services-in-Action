// 예제 10-3 nodetodo: 사용자 추가(index.js)

if (input['user-add'] === true) {
    var params = {
	"Item": {
	    "uid": {"S": input['<uid>']},
	    "email": {"S": input['<email>']},
	    "phone": {"S": input['<phone>']},
	},
	"TableName": "todo-user",
	"ConditionExpression": "attribute_not_exists(uid)"
    };
    db.putItem(params, function(err) {
	if (err) {
	    console.error('error', err);
	} else {
	    console.log('user added with uid ' + input['<uid>']);
	}
    });
}

