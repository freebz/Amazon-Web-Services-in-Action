# 예제 6-1 실행 중인 모든 EC2 인스턴스에 보안 업데이트 설치하기

PUBLICNAMES=$(aws ec2 describe-instances \
--filters "Name=instance-state-name,Values=running" \
--query "Reservations[].Instances[].PublicDnsName" \
--output text)

for PUBLICNAME in $PUBLICNAMES; do
    ssh -t -o StrictHostKeyChecking=no ec2-user@$PUBLICNAME \
    "sudo yum -y --security update"
done
