const Koa = require('koa')
const app = new Koa()

// app.use((ctx, next) => {
//
//
//    /* Content-Length: 261
//     Server: waf/2.14.2-2.el6
//     X-WAF-UUID: d2fb9b9d-479e-4963-8e8b-af108eb95714
//     Last-Modified: Fri, 27 Jul 2018 12:14:41 GMT
//     ETag: "5b5b0cb1-105"
//     Expires: Thu, 23 May 2019 08:22:58 GMT
//     Cache-Control: no-cache
//     a: 1
//     X-Frame-Options: SAMEORIGIN
//     Accept-Ranges: bytes
//     X-Via: 1.1 zhouwangtong151:0 (Cdn Cache Server V2.0), 1.1 PSjlybwtgo131:1 (Cdn Cache Server V2.0), 1.1 tong14:4 (Cdn Cache Server V2.0)
//     Connection: keep-alive*/
//
//     ctx.set('Content-Type', 'text/xml')
//     next()
// });

const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')

const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')

const { REDIS_CONF } = require('./config/db')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))



app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 日志相关
// 根据环境变量设置日志格式
const ENV = process.env.NODE_ENV
if(ENV !== 'production'){
    // 开发或者测试环境
    app.use(morgan('dev',{
        stream:process.stdout
    }))
}else{
    // 线上环境
    const logFileName = path.join(__dirname,'logs','access.log');
    const writeStream = fs.createWriteStream(logFileName,{
        flags:'a'
    })
    app.use(morgan('combined',{
        stream : writeStream
    }))
}

app.keys = ['123456_lence']
app.use(session({
    // 配置 cookie
    cookie:{
      path:'/',
        httpOnly:true,
        maxAge:24*60*60*1000
    },
    // 配置redis
    store:redisStore({
        //all:'127.0.0.1:6397'
        all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
    })

}))


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
