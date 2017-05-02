var gulp = require('gulp');
var concat = require('gulp-concat');                            //- 多个文件合并为一个；
var minifyCss = require('gulp-minify-css');                     //- 压缩CSS为一行；
var rev = require('gulp-rev');                                  //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');               //- 路径替换
// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify')
jshint = require('gulp-jshint'),//js检测
imagemin = require('gulp-imagemin'),//图片压缩


// 压缩图片
gulp.task('img', function() {
  return gulp.src('./images/*')
    .pipe(imagemin({
        /*progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]*/
    }))
    .pipe(gulp.dest('./min/images/'))
    .pipe(notify({ message: 'img task ok' }));
});

//检查js
gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'lint task ok' }));
});

gulp.task('script',function(){
	//文件位置
	gulp.src('js/*.js')
		//压缩
		.pipe(uglify())
		//另存的地方
		.pipe(gulp.dest('./min/js'))
})

gulp.task('concat', function() {                                //- 创建一个名为 concat 的 task
    gulp.src(['./style/base.css','./style/home.css','./style/all.css'])    //- 需要处理的css文件，放到一个字符串数组里
        .pipe(concat('wap.min.css'))                            //- 合并后的文件名
        .pipe(minifyCss())                                      //- 压缩处理成一行
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('./min/style'))                               //- 输出文件本地
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev'));                              //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('rev', function() {
    gulp.src(['./rev/*.json', './application/**/header.php'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('./application/'));                     //- 替换后的文件输出的目录
});

gulp.task('watch',function(){
    gulp.watch(['./style/VRgame.css', './style/home.css','./style/webgame.css'])
    gulp.watch('./js/*.js')
    gulp.watch('./images/*')
})

gulp.task('default',function(){
    gulp.run(['concat','script','img']);
    gulp.watch(['./style/VRgame.css', './style/home.css','./style/webgame.css'],function(){
        gulp.run('concat');
    })
    gulp.watch('./js/*.js',function(){
    	gulp.run('script')
    })
    gulp.watch('./images/*',function(){
    	gulp.run('img')
    })
})