# 예제 5-1 가상 서버에 VPN 서버 배포하기: CloudFormation 및 셸 스크립트

VpcId=$(aws ec2 describe-vpcs --query Vpcs[0].VpcId --output text)

SubnetId=$(aws ec2 describe-subnets --filters Name=vpc-id,Values=$VpcId \
--query Subnets[0].SubnetId --output text)


SharedSecret=$(openssl rand -base64 30)


Password=$(openssl rand -base64 30)

aws cloudformation create-stack --stack-name vpn --template-url \
https://s3.amazonaws.com/awsinaction/chapter5/vpn-cloudformation.json \
--parameters ParameterKey=KeyName,ParameterValue=mykey \
ParameterKey=VPC,ParameterValue=$VpcId \
ParameterKey=Subnet,ParameterValue=$SubnetId \
ParameterKey=IPSecSharedSecret,ParameterValue=$SharedSecret \
ParameterKey=VPNUser,ParameterValue=vpn \
ParameterKey=VPNPassword,ParameterValue=$Password

aws cloudformation describe-stacks --stack-name vpn \
--query Stacks[0].Outputs