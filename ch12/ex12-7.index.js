// 예제 12-7 index.js: 메시지를 큐로 보내기

var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var sqs = new AWS.SQS({
    "region": "us-east-1"
});

if (process.argv.length !== 3) {
    console.log('URL missing');
    process.exit(1);
}

var id = uuid.v4();
var body = {
    "id": id,
    "url": process.argv[2]
};

var params = {
    "MessageBody": JSON.stringify(body),
    "QueueUrl": "$QueueUrl"
};

sqs.sendMessage(params, function(err) {
    if (err) {
	console.log('error', err);
    } else {
	console.log('PNG will be available soon at http://url2png-$YourName.s3-website-us-east1.amazons.com/' + id + '.png');
    }
});
