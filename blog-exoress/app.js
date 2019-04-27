var createError = require('http-errors');
var express = require('express');
const fs = require('fs')
var path = require('path'); // 解析路径  查询参数
var cookieParser = require('cookie-parser'); // cookie解析插件
var logger = require('morgan'); // 日志记录插件
const session = require('express-session')  //设置session 设置客户端cookie
const RedisStore = require('connect-redis')(session) // session 和 redis关联

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// 日志相关
// 根据环境变量设置日志格式
const ENV = process.env.NODE_ENV
if(ENV !== 'production'){
    // 开发或者测试环境
    app.use(logger('dev',{
        stream:process.stdout
    }))
}else{
    // 线上环境
    const logFileName = path.join(__dirname,'logs','access.log');
    const writeStream = fs.createWriteStream(logFileName,{
        flags:'a'
    })
    app.use(logger('combined',{
        stream : writeStream
    }))
}
app.use(express.json());  //解析 post请求的 json 格式数据data
app.use(express.urlencoded({extended: false})); //解析表单提交的数据 k = v 模式的数据
app.use(cookieParser()); // 解析cookie

// app.use(express.static(path.join(__dirname, 'public')));
const redisClient = require('./db/redis') // reids 数据库配置相关

const  sessionStore = new RedisStore({
    client:redisClient,
})
app.use(session({
    secret: 'Lence-Love-Nancy',
    cookie: {
        // path: '/',      默认配置
        // httpOnly: true,  默认配置
        maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore,
}))


// 注册路由
// app.use('/', indexRouter);
// // app.user 中的路径为一级路径 /users/XXX/XXX
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});

module.exports = app;
