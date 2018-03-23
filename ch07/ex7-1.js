// 예제 7-1 S3용 AWS SDK를 이용하여 이미지 업로드하기

[...]
var AWS = require("aws-sdk");
[...]
var s3 = new AWS.S3({"region": "us-east-1"});

var bucket = "[...]";

function uploadImage(image, response) {
    var params = {
	Body: image,
	Bucket: bucket,
	Key: uuid.v4(),
	ACL: "public-read",
	ContentLength: image.byteCount
    };
    s3.putObject(params, function(err, data) {
	if (err) {
	    console.error(err);
	    response.status(500);
	    response.send("Internal server error.");
	} else {
	    response.redirect("/");
	}
    });
}
[...]
