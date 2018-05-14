// 예제 10-7 nodetodo: 카테고리 인덱스로부터 태스크 추출하기(index.js)

if (input['task-la'] === true) {
    var now = moment().format("YYYYMMDD");
    var params = {
	"KeyConditionExpression": "category = :category",
	"ExpressionAttributeValues": {
	    ":category": {"S": input['<category>']}
	},
	"TableName": "todo-task",
	"IndexName": "category-index"
    };
    if (input['--overdue'] === true) {
	params.FilterExpression = "due < :yyyymmdd";
	params.ExpressionAttributeValues[':yyyymmdd'] = {"N": now};
    }
    [...]
    db.query(params, function(err, data) {
	if (err) {
	    console.error('error', err);
	} else {
	    console.log('tasks', data.Items.map(mapTaskItem));
	}
    });
}
