const router = require('koa-router')()

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
    setRecommend
} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
router.prefix('/api/blog')
// 文章列表
router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || '';
    const keyword = ctx.query.keyword || '';
    const tags = ctx.query.tags || '';
    const createtime = ctx.query.createtime || '';
    if (ctx.query.isadmin) {
        if (ctx.session.username == null) {
            // 未登录
            ctx.body = new ErrorModel('未登录')
        }
        // 强制查询自己的博客
        author = ctx.session.username;
    }

    // result 为一个promise
    const listData = await getList(author, keyword,createtime,tags)
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
    if(data){
        ctx.body = new SuccessModel('发布成功')
    }else{
        ctx.body = new ErrorModel('发布失败')
    }


});
// 更新文章
router.post('/update', loginCheck, async function (ctx, next) {
    // req.body 应该包含  id title content 属性，会加上tas
    console.log(ctx.request.body)
    const data = await updateBlog(ctx.request.body)
    if (data) {
        ctx.body = new SuccessModel('更新成功')
    } else {
        ctx.body = new SuccessModel('更新失败')
    }
});
// 设为推荐
router.post('/setRec', loginCheck, async function (ctx, next) {
    // req.body 应该包含  id isRec
    const data = await setRecommend(ctx.request.body)
    if (data) {
        ctx.body = new SuccessModel('设置成功')
    } else {
        ctx.body = new SuccessModel('设置失败')
    }
});
// 删除文章
router.post('/del', loginCheck, async function (ctx, next) {
    // req.body 应该包含 id
    const data = await delBlog(ctx.request.body.id, ctx.session.username)
    if (data) {
        ctx.body = new SuccessModel('删除成功')

    } else {
        ctx.body = new ErrorModel('删除失败')
    }
})
module.exports = router
