// 예제 10-2 nodetodo: Node.js에서 docopt 사용하기(index.js)

var fs = require('fs');
var docopt = require('docopt');
var moment = require('moment');

var AWS = require('aws-sdk');
var db = new AWS.DynamoDB({
    "region": "us-east-1"
});

var cli = fs.readFileSync('./cli.txt', {"encoding": "utf8"});
var input = docopt.docopt(cli, {
    "version": "1.0",
    "argv": process.argv.splice(2)
});
