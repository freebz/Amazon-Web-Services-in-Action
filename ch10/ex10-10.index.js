// 예제 10-10 nodetodo: 태스크 제거하기(index.js)

if (input['task-rm'] === true) {
    var params = {
	"Key": {
	    "uid": {"S": input['<uid>']},
	    "tid": {"N": input['<uid>']}
	},
	"TableName": "todo-task"
    };
    db.deleteItem(params, function(err) {
	if (err) {
	    console.error('error', err);
	} else {
	    console.log('task removed with tid ' + input['<tid>']);
	}
    });
}
