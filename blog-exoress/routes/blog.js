var express = require('express');
var router = express.Router();

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')


const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

// 文章列表
router.get('/list', function(req, res, next) {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    if(req.query.isadmin){
        if(req.session.username == null){
            // 未登录
            res.json(
                new ErrorModel('未登录')
            )
        }
        // 强制查询自己的博客
        author = res.session.username;
    }

    // result 为一个promise
    const result = getList(author, keyword)
    //直接返回 组装好的成功数据格式
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
});
// 文章详情
router.get('/detail', function(req, res, next) {
    const id = req.query.id
    const result = getDetail(id)
    // 这里的 data 就是 rows[0]
    result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })


});
// 新建文章
router.post('/new',loginCheck,function(req, res, next) {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});
// 更新文章
router.post('/update',loginCheck,function(req, res, next) {
    // req.body 应该包含  id title content 属性，会加上tas
    const result = updateBlog(req.body)
    return result.then(data => {
        if (data) {
            res.json(
                new SuccessModel('更新博客成功')
            )
        } else {
            res.json(
                new SuccessModel('更新博客失败')
            )
        }
    })
});
// 删除文章
router.post('/del',loginCheck,function(req, res, next) {
    // req.body 应该包含 id
    const result = delBlog(req.body.id, req.session.username)
    return result.then(data => {
        if (data) {
            res.json(
                new SuccessModel('删除博客成功')
            )
        } else {
            res.json(
                new SuccessModel('删除博客失败')
            )
        }
    })
})
module.exports = router;
