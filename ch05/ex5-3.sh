# 예제 5-3 서버 시작 시 패키지를 설치하고 구성 파일을 작성한다.

[...]

PRIVATE_IP=`curl -s http://169.254.169.254/latest/meta-data/local-ipv4`

PUBLIC_IP=`curl -s http://169.254.169.254/latest/meta-data/public-ipv4`

yum-config-manager --enable epel && yum clean all

yum install -y openswan xl2tpd

cat > /etc/ipsec.conf <<EOF
[...]
EOF

cat > /etc/ipsec.secrets <<EOF
$PUBLIC_IP %any : PSK "${IPSEC_PSK}"
EOF

cat > /etc/xl2tpd/xl2tpd.conf <<EOF
[...]
EOF

cat > /etc/ppp/options.xl2tpd <<EOF
[...]
EOF

service ipsec start && service xl2tpd start

chkconfig ipsec on && chkconfig xl2tpd on
