// 예제 7-2 S3 버킷으로부터 모든 이미지 위치 추출하기

[...]
var bucket = "[...]";

function listImages(response) {
    var params = {
	Bucket: bucket
    };
    s3.listObject(params, function(err, data) {
	if (err) {
	    console.log(err);
	    response.status(500);
	    response.send("Internal server error.");
	} else {
	    var stream = mu.compileAndRender("index.html",
	        {
		    Objects: data.Contents,
		    Bucket: bucket
		}
	    );
	    stream.pipe(response);
	}
    });
}
