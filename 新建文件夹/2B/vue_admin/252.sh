export PATH=$PATH:$HOME/soft/node/bin
cd /home/svnco/vue_admin
npm run build
baseDir='../enterprise/public'
let t=`date +%Y%m%d%H%M%S`
cat t.html |sed "s/version/$t/g" > tmp.html
mv tmp.html $baseDir/tobadmin/index.html
rsync -av --exclude=.svn dist/* $baseDir/tobadmin/
cp  dist/*.png $baseDir/dist/
rsync -av --exclude=.svn src/assets/* $baseDir/tobadmin/assets/
rsync -av --exclude=.svn src/style/* $baseDir/tobadmin/style/
cd $baseDir
cd dist/
svn add * --force
svn ci -m "tobadmin"
cd ../tobadmin/
svn add * --force
svn ci -m "tobadmin"