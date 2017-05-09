let t=`date +%Y%m%d%H%M%S`
cat t.html |sed "s/version/$t/g" > tmp.html
mv tmp.html /opt/works/vr/php/UserCenter/branch/enterprise/public/pay/index.html
cp dist/build.js /opt/works/vr/php/UserCenter/branch/enterprise/public/pay/