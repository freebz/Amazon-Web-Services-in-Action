// 예제 12-9 worker.js: 메시지 처리하기(스크린샷을 찍어 S3에 업로드하기)

function process(message, cb) {
    var body = JSON.parse(message.Body);
    var file = body.id + '.png';
    webshot(body.url, file, function(err) {
	if (err) {
	    cb(err);
	} else {
	    fs.readFile(file, function(err, buf) {
		if (err) {
		    cb(err);
		} else {
		    var params = {
			"Bucket": "url2png-$Yourname",
			"Key": file,
			"ACL": "public-read",
			"ContentType": "image/png",
			"Body": buf
		    };
		    s3.putObject(params, function(err) {
			if (err) {
			    cb(err);
			} else {
			    fs.unlink(file, cb);
			}
		    });
		}
	    });
	}
    });
}
