// 예제 10-11 nodetodo: 태스크를 갱신해서 완료 표시하기(index.js)

if (input['task-done'] === true) {
    var now = moment().format("YYYYMMDD");
    var params = {
	"Key": {
	    "uid": { "S": input['<uid>']},
	    "tid": { "N": input['<tid>']}
	},
	"UpdateExpression": "SET completed = :yyyymmdd",
	"ExpressionAttributeValues": {
	    ":yyyymmdd": {"N": now}
	},
	"TableName": "todo-task"
    };
    db.updateItem(params, function(err) {
	if (err) {
	    console.error('error', err);
	} else {
	    console.log('task completed with tid ' + input['<tid>']);
	}
    });
}
