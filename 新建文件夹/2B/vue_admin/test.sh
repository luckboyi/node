baseDir='../../../php/UserCenter/branch/enterprise/public'
let t=`date +%Y%m%d%H%M%S`
cat t.html |sed "s/version/$t/g" > tmp.html
mv tmp.html $baseDir/tobadmin/index.html
cp -r dist/ $baseDir/tobadmin/
cp  src/js/getdata.js $baseDir/tobadmin/
cp  dist/*.png $baseDir/dist/
cp -r src/assets/ $baseDir/tobadmin/assets/
cp -r src/style/ $baseDir/tobadmin/style/
cd $baseDir
cd dist/
svn add * --force
svn ci -m "tobadmin"
cd ../tobadmin/
svn add * --force
svn ci -m "tobadmin"