// 예제 10-9 nodetodo: 사용자 제거하기(index.js)

if (input['user-rm'] === true) {
    var params = {
	"Key": {
	    "uid": {"S": input['<uid>']}
	},
	"TableName": "todo-user"
    };
    db.deleteItem(params, function(err) {
	if (err) {
	    console.error('error', err);
	} else {
	    console.log('user removed with uid ' + input['<uid>']);
	}
    });
}
