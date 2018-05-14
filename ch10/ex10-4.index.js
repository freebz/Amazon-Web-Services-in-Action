// 예제 10-4 nodetodo: 태스크 추가(index.js)

if (input['task-add'] === true) {
    var tid = Date.now();
    var params = {
	"Item": {
	    "uid": {"S": input['<uid>']},
	    "tid": {"N": tid.toString()},
	    "description": {"S": input['<description>']},
	    "created": {"N": moment().format("YYYYMMDD")}
	},
	"TableName": "todo-task",
	"ConditionExpression":
	"attribute_not_exists(uid) and attribute_not_exists(tid)"
    };
    if (input['--dueat'] !== null) {
	params.Item.due = {"N": input['--dueat']};
    }
    if (input['<category>'] !== null) {
	params.Item.category = {"S": input['<category>']};
    }
    db.putItem(params, function(err) {
	if (err) {
	    console.error('error', err);
	} else {
	    console.log('task added with tid ' + tid);
	}
    });
}
