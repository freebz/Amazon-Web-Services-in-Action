// 예제 10-8 nodetodo: 페이징 방식으로 모든 사용자 추출하기(index.js)

if (input['user-ls'] === true) {
    var params = {
	"TableName": "todo-user",
	"Limit": input['--limit']
    };
    if (input['--next'] !== null) {
	params.ExclusiveStartKey = {
	    "uid": {"S": input['--next']} };
    }
    db.scan(params, function(err, data) {
	if (err) {
	    console.error('error', err);
	} else {
	    console.log('users', data.Items.map(mapUserItem));
	    if (data.LastEvaluatedKey !== undefined) {
		console.log('more users available with --next' + data.LastEvaluatedKey.uid.S);
	    }
	}
    });
}
