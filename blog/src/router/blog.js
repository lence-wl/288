const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
// 登录状态验证函数
const loginCheck = (req) =>{
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method
    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {

        const checkResult = loginCheck(req)
        if (checkResult) return checkResult


        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // result 为一个promise
        const result = getList(author, keyword)
        //直接返回 组装好的成功数据格式
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        const result = getDetail(id)
        // 这里的 data 就是 rows[0]
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        // 验证登录函数
        const  loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 未登录
            return loginCheckResult
        }

        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        // 验证登录函数
        const  loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 未登录
            return loginCheckResult
        }
        const result = updateBlog(req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel('更新博客成功')
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }
    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        // 验证登录函数
        const  loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 未登录
            return loginCheckResult
        }
        const result = delBlog(req.body.id, req.session.username)
        return result.then(val => {
            if (val) {
                return new SuccessModel('删除成功')
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter
