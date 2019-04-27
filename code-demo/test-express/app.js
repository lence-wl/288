const express = require('express')

/*
*  app.use 注册的函数next被调用后都会执行
*  app.use 如果第一个参数是一个路由  则不管是post 请求还是 get 请求，请求的路由会逐步联级匹配，只要一步能正确匹配，都会被执行
*  app.get 如果是get请求 ，只要路由匹配就会被执行
*  app.post 如果是post请求 ，只要路由匹配就会被执行
*  直到执行的函数中不再调用 next()  表明请求处理完成，改函数中要使用 res 给前端返回数据
*
*
* */



// 本次 http 请求的实例
const app = express()

app.use((req,res,next) => {
    console.log('请求开始。。。')
    next()
})

app.use((req,res,next) => {
    // 假设在处理 cookie
    console.log('正在处理cookie ')
    req.cookie = {
        userId : 'abc123'
    }
    next()
})

app.use((res,req,next) => {
    // 假设处理post data
    // 模拟异步
    console.log('正在接受 post data 数据')
    setTimeout(() => {
        req.body = {
            a:100,
            b:200,
        }
    })
    next()
})

app.use('/api',(req,res,next) =>{
    console.log('处理请求 /api处理请求 不管是post还是get，只要一级路由被正确匹配就会被执行')
    next()
})

app.get('/api',(req,res,next) =>{
    console.log('处理请求 GET /api 路由')
    next()
})

app.post('/api',(req,res,next) =>{
    console.log('处理请求 POST /api 路由')
    next()
})

// 模拟登陆验证中间件
function loginCheck(res,req,next){
    // setTimeout(() => {
    //     console.log('登陆成功')
    //     next()
    // })
    setTimeout(() => {
        console.log('登陆失败')
        next()
    })
}



app.get('/api/get-cookie',loginCheck,(req,res,next) => {
    console.log('get /api/get-cookie')
    res.json({
        errno:0,
        data:req.cookie
    })
})

app.post('/api/get-post-data',(req,res,next) => {
    console.log('post /api/get-post-data')
    res.json({
        errno:0,
        data:req.body,
    })
})

app.use((req,res,next) => {
    console.log('处理404')

    res.json({
        errno:-1,
        msg:'404 not found'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})
