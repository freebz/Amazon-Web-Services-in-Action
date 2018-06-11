// 예제 13-5 Imagery 작업자 초기화하기(worker/worker.js)

var express = require('express')
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var assert = require('assert-plus');
var Caman = require('caman').Caman;
var fs = require('fs');

var db = new AWS.DynamoDB({
    "region": "us-east-1"
});
var s3 = new AWS.S3({
    "region": "us-east-1"
});

var app = express();
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.json({});
});

[...]

app.listen(process.env.PORT || 8080, function() {
    console.log("Worker started on port " + (process.env.PORT || 8080));
});
