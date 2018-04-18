# 예제 9-2 CloudFormation 스택의 상태 확인

aws cloudformation describe-stacks --stack-name wordpress
{
  "Stacks": [{
    "StackId": "...",
    "Description": "AWS in Action: chapter 9",
    "Parameters": [{
      "ParameterValue": "mykey",
      "ParameterKey": "KeyName"
    }],
    "Tags": [],
    "Outputs": [{
      "Description": "Wordpress URL",
      "OutputKey": "URL",
      "OutputValue": "http://[...].com/wordpress"
    }],
    "StackStatusReason": "",
    "CreationTime": "2015-05-16T06:30:40.515Z",
    "StackName": "wordpress",    
    "NotificationARNs": [],
    "StackStatus": "CREATE_COMPLETE",
    "DisableRollback": false,    
  }]
}
