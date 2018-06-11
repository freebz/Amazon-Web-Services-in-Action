// 예제 13-4 Imagery 서버: POST /image/:id/upload로 이미지를 업로드한다.

function uploadImage(image, part, response) {
    var rawS3Key = 'upload/' + image.id + '-' + Date.now();
    s3.putObject({
	"Bucket": process.env.ImageBucket,
	"Key": rawS3Key,
	"Body": part,
	"ContentLength": part.byteCount
    }, function(err, data) {
	if (err) {
	    throw err;
	} else {
	    db.updateItem({
		"Key": {
		    "id": {
			"S": image.id
		    }
		},
		"UpdateExpression": "SET #s:newState,
                    version=:newVersion, rawS3Key=:rawS3Key",
		"ConditionExpression": "attribute_exists(id)
                    AND version=:oldVersion
                    AND #s IN (:stateCreated, :stateUploaded)",
		"ExpressionAttributeNames": {
		    "#s": "state"
		},
		"ExpressionAttributeValues": {
		    ":newState": {
			"S": "uploaded"
		    },
		    ":oldVersion": {
			"N": image.version.toString()
		    },
		    ":newVersion": {
			"N": (image.version + 1).toString()
		    },
		    ":rawS3Key": {
			"S": rawS3Key
		    },
		    ":stateCreated": {
			"S": "created"
		    },
		    ":stateUploaded": {
			"S": "uploaded"
		    }
		},
		"ReturnValues": "ALL_NEW",
	    }, function(err, data) {
		if (err) {
		    throw err;
		} else {
		    sqs.sendMessage({
			"MessageBody": JSON.stringify({
			    "imageId": image.id,
			    "desiredState": "processed"
			}),
			"QueueUrl": process.env.ImageQueue,
		    }, function(err) {
			if (err) {
			    throw err;
			} else {
			    response.json(lib.mapImage(data.Attributes));
			}
		    });
		}
	    });
	}
    });
}

app.post('/image/:id/upload', function(request, response) {
    getImage(request.params.id, function(err, image) {
	if (err) {
	    throw err;
	} else {
	    var form = new multiparty.Form();
	    form.on('part', function(part) {
		uploadImage(image, part, response);
	    });
	    form.parse(request);
	}
    });
});
