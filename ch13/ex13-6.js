// 예제 13-6 Imagery 작업자: POST /sqs는 SQS 메시지를 처리한다.

function processImage(image, cb) {
    var processedS3Key = 'processed/' + image.id + '-' + Date.now() + '.png';
    // S3에서 원시 이미지 다운로드
    // 이미지 처리
    // S3로 세피아 이미지 업로드
    db(null, processedS3key);
}

function processed(image, request, response) {
    processImage(image, function(err, processedS3Key) {
	if (err) {
	    throw err;
	} else {
	    db.updateItem({
		"Key": {
		    "id": {
			"S": image.id
		    }
		},
		"UpdateExpression": "SET #s=:newState,
                    version=:newVersion, processedS3Key=:processedS3Key",
		"ConditionExpression": "attribute_exists(id)
                    AND version=:oldVersion
                    AND #s IN (:stateUploaded, :stateProcessed)",
		"ExpressionAttributeNames": {
		    "#s": "state"
		},
		"ExpressionAttributeValues": {
		    ":newState": {
			"S": "processed"
		    },
		    ":oldVersion": {
			"N": image.version.toString()
		    },
		    ":newVersion": {
			"N": (image.version + 1).toString()
		    },
		    ":processedS3Key": {
			"S": processedS3Key
		    },
		    ":statedUploaded": {
			"S": "uploaded"
		    },
		    ":stateProcessed": {
			"S": "processed"
		    }
		},
		"ReturnValues": "ALL_NEW",
		"TableName": "imagery-image"
	    }, function(err, data) {
		if (err) {
		    throw err;
		} else {
		    response.json(lib.mapImage(data.ttributes));
		}
	    });
	}
    });
}

app.post('/sqs', function(request, response) {
    assert.string(request.body.imageId, "imageId");
    assert.string(request.body.desiredState, "desiredState");
    getImage(request.body.imageId, function(err, image) {
	if (err) {
	    throw err;
	} else {
	    if (request.body.desiredState === 'processed') {
		processed(image, request, response);
	    } else {
		throw new Error("unsupported desiredState");
	    }
	}
    });
});
