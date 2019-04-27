const handleBlogRouter = require('./src/router/blog') // 博客相关接口

const handleUserRouter = require('./src/router/user')  // 用户相关接口

const querystring = require('querystring') //解析query

const { get,set } = require('./src/db/redis')

const { access } = require('./src/utils/log')  // 访问日志

// 设置 cookie 的国过期时间
const setCookieExpires = () =>{
    const  d = new Date()
    d.setTime(d.getTime() + (24 * 3600 * 1000))
    return d.toGMTString()
}

//解析 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        // 不是post请求，跳出
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        // 是post请求，数据格式不对，跳出
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        // 是post请求，数据格式正确，接收并解析 post 请求发送过来的 数据 data
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )

        })
    })
    return promise
}



// 路由处理 ！！！！每一个请求都会进入此函数中处理！！！！
const serverHandle = (req, res) => {
    // 写入 access 访问日志
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
    //设置返回格式
    res.setHeader('Content-type', 'application/json')
    //获取path
    const url = req.url
    req.path = url.split('?')[0]
    // 解析query
    req.query = querystring.parse(url.split('?')[1])
    ///解析 cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || ''  // k1=v1;k2=V2
    cookieStr.split(';').forEach(item => {
        if(!item) return;
        const arr = item.split('=');
        const key = arr[0].trim();
        const value = arr[1].trim();
        req.cookie[key] = value;
    })

    // 解析 session 数据
    /*let needSetCookie = false;
    let userId = req.cookie.userId
    if(userId) {
        if(!SESSION_DATA[userId]) {  // 说明 SESSION_DATA 没有保存过改用户的信息,需要初始化
            SESSION_DATA[userId] = {}
        }
    }else{
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]*/

    // 解析session 使用 redis
    let needSetCookie = false
    let userId = req.cookie.userId
    if(!userId){
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的session 的值
        set(userId,{})
        // 设置请求头中的session
        req.session = {}
    }
    // 获取session
    req.sessionId = userId;
    get(req.sessionId).then(sessionData => {
        if(sessionData == null){
            // 初始化redis中的session值
            set(req.sessionId,{})
            // 设置请求头中的session
            req.session = {}
        }else{
            req.session = sessionData
        }

        // 处理post Data
        return getPostData(req)
    })
        .then(postData => {
        req.body = postData   // 前端post 请求发送的数据
        //处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        //处理user路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            userData.then(data =>{
                // 判断是否需要设置cookie
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly;expires=${setCookieExpires()}`)
                }
                res.end(
                JSON.stringify(data)
            )
            })

            return
        }
        //未匹配路由 返回404
        res.writeHead(404, {'Content-type': 'text/plain'})
        res.write('404 Not Found\n')
        res.end()
        }
    )




}

module.exports = serverHandle;
