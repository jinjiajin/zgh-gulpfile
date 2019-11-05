//mac下安装npm https://www.jianshu.com/p/fa25e03f5ef9
//windows下安装npm https://www.jianshu.com/p/2d9fa3659645
//教程官网 https://www.gulpjs.com.cn
//npm install gulp -g
//npm install gulp gulp-htmlclean gulp-htmlmin gulp-minify-css gulp-uglify --save

/*
 * @此配置用于正广和app
 */
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');

//压缩img
gulp.task('minify-images', function () {
    // 1. 找到图片
    return gulp.src('www/img/*.*')
    // 2. 压缩图片
        .pipe(imagemin({
            progressive: true
        }))
    // 3. 另存图片
        .pipe(gulp.dest('www/img'))
});

// 压缩css
gulp.task('minify-css', function() {
    return gulp.src('www/css/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('www/css'));
});

// 压缩html
gulp.task('minify-html', function() {
    return gulp.src('www/templates/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,  //清除HTML注释
            collapseWhitespace: true,  //压缩HTML
            collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
            removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
            minifyJS: false,  //压缩页面JS
            minifyCSS: true  //压缩页面CSS
        }))
        .on('error', function(err) {
            console.log('html Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest('www/templates'))
});

// 压缩js
gulp.task('minify-js-a', function() {
    return gulp.src('www/js/*.js')
        .pipe(uglify({
          mangle: false,//类型：Boolean 默认：true 是否修改变量名
          compress: true,//类型：Boolean 默认：true 是否完全压缩
        }
        ))
        .pipe(gulp.dest('www/js'));
});

// 压缩 js
gulp.task('minify-js-b', function() {
    return gulp.src('www/js/controller/*.js')
        // .pipe(uglify())
        .pipe(uglify({
          mangle: false,//类型：Boolean 默认：true 是否修改变量名
          compress: true,//类型：Boolean 默认：true 是否完全压缩
        }
        ))
        .pipe(gulp.dest('www/js/controller'));
});

gulp.task('show', gulp.series('minify-images','minify-html','minify-css','minify-js-a','minify-js-b', function() {
  // 执行 gulp show 命令时执行所有任务
  // gulp minify-images minify-html minify-css minify-js
}));


