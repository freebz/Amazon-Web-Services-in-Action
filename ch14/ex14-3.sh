# 예제 14-3 매일 20:00 UTC에 실행되는 반복 스케일링 작업 스케줄링하기

aws autoscaling put-scheduled-update-group-action \
    --scheduled-action-name ScaleTo2 \
    --auto-scaling-group-name webapp \
    --recurrence "0 20 * * *" \
    --desired-capacity 2
