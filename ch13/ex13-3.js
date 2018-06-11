// 예제 13-3 Imagery 서버: GET /image/:id로 이미지 프로세스를 조회한다.

function mapImage(item) {
    return {
	"id": item.id.S,
	"version": parseInt(item.version.N, 10),
	"state": item.state.S,
	"rawS3Key": [...]
	"processedS3Key": [...]
	"processedImage": [...]
    };
};

function getImage(id, cb) {
    db.getItem({
	"Key": {
	    "id": {
		"S": id
	    }
	},
	"TableName": "imagery-image"
    }, function(err, data) {
	if (err) {
	    cb(err);
	} else {
	    if (data.Item) {
		cb(null, mapImage(data.Item));
	    } else {
		cb(new Error("image not found"));
	    }
	}
    });
}
app.get('/image/:id', function(request, response) {
    getImage(request.params.id, function(err, image) {
	if (err) {
	    throw err;
	} else {
	    response.json(image);
	}
    });
});
