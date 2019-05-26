const router = require('koa-router')()
const {getList, newTag, delTag, changeState} = require('../controller/tag'); // 登陆数据库查询
const {SuccessModel, ErrorModel} = require('../model/resModel')  // 响应数据格式
const loginCheck = require('../middleware/loginCheck')
router.prefix('/api/tag')
router.get('/list', loginCheck, async function (ctx, next) {
    const tagType = ctx.query.tagType
    const state = ctx.query.state
    console.log({tagType})
    const listData = await getList(tagType,state)
    if(listData){
        ctx.body = new SuccessModel(listData)
    }else{
        ctx.body = new ErrorModel('查询失败')
    }

})
router.post('/add', loginCheck, async function (ctx, next) {
    const body = ctx.request.body
    const data = await newTag(body)
    if(data){
        ctx.body = new SuccessModel('添加成功')
    }else{
        ctx.body = new ErrorModel('添加失败')
    }
})

router.post('/changeState', loginCheck, async function (ctx, next) {
    // req.body 应该包含 id state
    const data = await changeState(ctx.request.body.id,ctx.request.body.state)
    if (data) {
        ctx.body = new SuccessModel('操作成功')

    } else {
        ctx.body = new ErrorModel('操作失败')
    }
})

router.post('/delTag', loginCheck, async function (ctx, next) {
    // req.body 应该包含 id
    const data = await delTag(ctx.request.body.id)
    if (data) {
        ctx.body = new SuccessModel('删除成功')

    } else {
        ctx.body = new ErrorModel('删除失败')
    }
})

module.exports = router
