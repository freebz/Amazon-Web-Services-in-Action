// 예제 12-10 worker.js: 메시지 승인(큐에서 메시지 삭제)

function acknowledge(message, cb) {
    var params = {
	"QueueUrl": "$QueueUrl",
	"ReceiptHandle": message.ReceiptHandle
    };
    sqs.deleteMessage(params, cb);
}
