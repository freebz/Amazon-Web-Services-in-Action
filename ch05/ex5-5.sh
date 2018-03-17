# 예제 5-5 CloudFormation으로 사용자 정의 방화벽 생성하기

aws ec2 describe-vpcs --query Vpcs[0].VpcId --output text

aws cloudformation create-stack --stack-name irc \
--template-url https://s3.amazonaws.com/awsinaction/\
chapter5/irc-cloudformation.json \
--parameters ParameterKey=VPC,ParameterValue=$VpcId

aws cloudformation describe-stacks --stack-name irc \
--query Stacks[0].StackStatus
