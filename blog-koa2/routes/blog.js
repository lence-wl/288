const router = require('koa-router')()

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
router.prefix('/api/blog')
// 文章列表
router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || '';
    const keyword = ctx.query.keyword || '';
    if (ctx.query.isadmin) {
        if (ctx.session.username == null) {
            // 未登录
            ctx.body = new ErrorModel('未登录')
        }
        // 强制查询自己的博客
        author = ctx.session.username;
    }

    // result 为一个promise
    const listData = await getList(author, keyword)
    //直接返回 组装好的成功数据格式
    ctx.body = new SuccessModel(listData)
})
// 文章详情
router.get('/detail', async function (ctx, next) {
    const id = ctx.query.id
    const result = await getDetail(id)
    // 这里的 data 就是 rows[0]
    ctx.body = new SuccessModel(result)
});
// 新建文章
router.post('/new', loginCheck, async function (ctx, next) {
    const body = ctx.request.body
    body.author = ctx.session.username

    const data = await newBlog(body)
    ctx.body = new SuccessModel(data)

});
// 更新文章
router.post('/update', loginCheck, async function (ctx, next) {
    // req.body 应该包含  id title content 属性，会加上tas
    const data = await updateBlog(ctx.query.body)
    if (data) {
        ctx.body = new SuccessModel('更新博客成功')
    } else {
        ctx.body = new SuccessModel('更新博客失败')
    }
});
// 删除文章
router.post('/del', loginCheck, async function (ctx, next) {
    // req.body 应该包含 id
    const data = await delBlog(ctx.body.id, ctx.session.username)
    if (data) {
        ctx.body = new SuccessModel('删除博客成功')

    } else {
        ctx.body = new SuccessModel('删除博客失败')
    }
})
module.exports = router
