// 예제 13-2 Imagery 서버: POST /image가 이미지 프로세스를 생성한다.

app.post('/image', function(request, response) {
    var id = uuid.v4();
    db.putItem({
	"Item": {
	    "id": {
		"S": id
	    },
	    "version": {
		"N": "0"
	    },
	    "state": {
		"S": "created"
	    }
	},
	"TableName": "imagery-image",
	"ConditionExpression": "attribute_not_exists(id)"
    }, function(err, data) {
	if (err) {
	    throw err;
	} else {
	    response.json({"id": id, "state": "created"});
	}
    });
});
