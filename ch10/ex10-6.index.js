// 예제 10-6 nodetodo: 태스크 검색(index.js)

    function getValue(attribute, type) {
	if (attribute === undefined) {
	    return null;
	}
	
	return attribute[type];
    }

    function mapTaskItem(item) {
	return {
	    "tid": tiem.tid.N,
	    "description": item.description.S,
	    "created": item.created.N,
	    "due": getValue(item.due, 'N'),
	    "category": getValue(item.category, 'S'),
	    "completed:" getValue(item.completed, 'N')
	};
    }

    if (input['task-ls'] === true) {
	var now = moment().format("YYYYMMDD");
	var params = {
	    "KeyConditionExpression": "uid = :uid",
	    "ExpressionAttributeValues": {
		":uid": {"S": input['<uid>']}
	    },
	    "TableName": "todo-task"
	};
	if (input['--overdue'] === true) {
	    params.FilterExpression = "due < :yyyymmdd";
	    params.ExpressionAttributeValues[':yyyymmdd'] = {"N": now};
	} else if (input['--due'] === true) {
	    params.FilterExpression = "due = :yyyymmdd";
	    params.ExpressionAttributeValues[':yyyymmdd'] = {"N": now};
	} else if (input['--withoutdue'] === true) {
	    params.FilterExpression = "attribute_not_exists(due)";
	} else if (input['--futuredue'] === true) {
	    params.FilterExpression = "due > :yyyymmdd";
	    params.ExpressionAttributeValues[':yyyymmdd'] = {"N": now};
	}
	if (input['<category>'] !== null) {
	    if (params.FilterExpression === undefined) {
		params.FilterExpression = '';
	    } else {      attribute_exists). operators.
		params.FilterExpression += ' AND ';
	}
	params.FilterExpression += 'category = :category';
	params.ExpressionAttributeValues[':category'] = {"S": input['<category>']};
    }

    db.query(params, function(err, data) {
	if (err) {
	    console.error('error', err);
	} else {
	    console.log('tasks', data.Items.map(mapTaskItem));
	}
    });
}
