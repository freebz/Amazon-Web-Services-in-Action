# 예제 14-2 1회성 스케일링 작업 스케줄링하기

aws autoscaling put-scheduled-update-group-action \
    --scheduled-action-name ScaleTo4 \
    --auto-scaling-group-name webapp \
    --start-time "2017-01-01T12:00:00Z" \
    --desired-capacity 4
