// 예제 12-8 worker.js: 큐에서 메시지 수신하기

var fs = require('fs');
var AWS = require('aws-sdk');
var webshot = require('webshot');
var sqs = new AWS.SQS({
    "region": "us-east-1"
});
var s3 = new AWS.S3({
    "region": "us-east-1"
});

function receive(cb) {
    var params = {
	"QueueUrl": "$QueueUrl",
	"MaxNumberOfMessages": 1,
	"VisibilityTimeout": 120,
	"WaitTimeSeconds": 10
    };
    sqs.receiveMessage(params, function(err, data) {
	if (err) {
	    cb(err);
	} else {
	    if (data.Message === undefined) {
		cb(null, null);
	    } else {
		cb(null, data.Messages[0]);
	    }
	}
    });
}

