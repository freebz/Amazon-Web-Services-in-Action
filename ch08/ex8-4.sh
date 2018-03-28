# 예제 8-4 NFS 설치 및 구성 스크립트

#!/bin/bash -ex

yum -y install nfs-utils nfs-utils-lib
service rpcbind start
service nfs start
chmod 777 /media/ephemera10
echo "/media/ephemeral0 *(rw,async)" >> /etc/exports
exportfs - a

while ! [ "$(fdisk -l | grep '/dev/xvdf' | wc -l)" -ge "1" ]; \
    do sleep 10; done

if [[ "$(file -s /dev/xvdf)" != *"ext4"* ]]
then
    mkfs -t ext4 /dev/xvdf
fi

mkdir /mnt/backup
echo "/dev/xvdf /mnt/backup ext4 defaults,nofail 0 2" >> /etc/fstab
mount -a

INSTANCEID=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)
VOLUMEID=$(aws --region us-east-1 ec2 describe-voumes \
	       --filters "name=attachment.instance-id,Values=$INSTANCEID" \
	       --query "Volumes[0].VolumeId" --output text)

cat > /etc/cron.d/backup << EOF
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin:/opt/aws/bin
MAILTO=root
HOME=/
*/15 * * * * root rsync -av --delete /media/ephemeral0/ /mnt/backup/ ; \
fsfreeze -f /mnt/backup/ ; \
aws --region us-east-1 ec2 create-snapshot --volume-id $VOLUMEID ; \
fsfreeze -u /mnt/backup/
EOF
