const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set,get } = require('../db/redis')

// 设置 cookie 的过期时间
const setCookieExpires = () =>{
    const  d = new Date()
    d.setTime(d.getTime() + (24 * 3600 * 1000))
    return d.toGMTString()
}

const handleUserRouter = (req,res) => {
    const method = req.method
    if(method === 'POST' && req.path === '/api/user/login'){
        //登录接口
        const {password,username} = req.body
        if(password && username){
            const result = login(username,password)
            return result.then(data => {
                if(data){
                    //操作cookie
                    res.setHeader('Set-Cookie',`userId=${req.sessionId}; path=/; httpOnly;expires=${setCookieExpires()}`)
                    // 设置session
                    req.session.username = data.username
                    req.session.realname = data.realname
                    // 同步到redis
                    set(req.sessionId, req.session)
                    get(req.sessionId).then( data =>{
                    })
                    return new SuccessModel('登录成功')
                }else{
                    return new ErrorModel('登录失败')
                }
            })
        }
    }
}

module.exports = handleUserRouter
