const router = require('koa-router')()

const {login} = require('../controller/user'); // 登陆数据库查询
const {SuccessModel, ErrorModel} = require('../model/resModel')  // 响应数据格式
/* GET home page. */
//登录接口
router.prefix('/api/user')


router.post('/login', async function (ctx, next) {
    const {password, username} = ctx.request.body
    console.log({password, username})

    if (password && username) {
        const data = await login(username, password)
        if (data.username) {
            // 设置session的同时会设置浏览器的 cookie
            ctx.session.username = data.username
            ctx.session.realname = data.realname
            ctx.body = new SuccessModel('登陆成功')
            return
        } else {
            ctx.body = new SuccessModel('登陆失败')
        }
    }
})
router.get('/session-test', async function (ctx, nex) {
    if (ctx.session.viewCount == null) {
        ctx.session.viewCount = 0
    }
    ctx.session.viewCount++
    ctx.body = {
        errno: 0,
        viewCount: ctx.session.viewCount
    }
})


module.exports = router
