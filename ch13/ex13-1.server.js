// 예제 13-1 Imagery 서버 초기화하기(server/server.js)

var express = require('express');
var bodyParser = require('body-parser');
var AWS =require('aws-sdk');
var uuid = require('node-uuid');
var multiparty = require('multiparty');

var db = new AWS.DynamoDB({
    "region": "us-east-1"
});
var sqs = new AWS.SQS({
    "region": "us-east-1"
});
var s3 = new AWS.S3({
    "region": "us-east-1"
});

var app = express();
app.use(bodyParser.json());

[...]
app.listen(process.env.PORT || 8080, function() {
    console.log("Server started. Open http://localhost:"
    + (process.env.PORT || 8080) + " with browser.");
});
