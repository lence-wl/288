var createError = require('http-errors');
var express = require('express');
var path = require('path'); // 解析路径  查询参数
var cookieParser = require('cookie-parser'); // cookie解析插件
var logger = require('morgan'); // 日志记录插件

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());  //解析 post请求的 json 格式数据data
app.use(express.urlencoded({ extended: false })); //解析表单提交的数据 k = v 模式的数据
app.use(cookieParser()); // 解析cookie

app.use(express.static(path.join(__dirname, 'public')));

// 注册路由
app.use('/', indexRouter);
// app.user 中的路径为一级路径 /users/XXX/XXX
app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
