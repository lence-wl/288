var express = require('express');
var router = express.Router();

const { login } = require('../controller/user'); // 登陆数据库查询
const { SuccessModel, ErrorModel } = require('../model/resModel')  // 响应数据格式
/* GET home page. */
//登录接口
router.post('/login', function(req, res, next) {
    const {password,username} = req.body
    if(password && username){
        const result = login(username,password)
        return result.then(data => {
            if(data){
                // 设置session的同时会设置浏览器的 cookie
                req.session.username = data.username
                req.session.realname = data.realname
                res.json(
                    new SuccessModel('登陆成功')
                )
                return
            }else{
                res.json(
                    new SuccessModel('登陆失败')
                )
            }
        })
    }
});


router.get('/login-test', function(req, res, next) {
    if(req.session.username){
        res.json({
                errno:0,
                msg:'登陆成功'
            })
        return
    }

    res.json({
            errno:0,
            msg:'登陆失败'
        })
});




router.get('/session-test', function(req, res, next) {
   const session = req.session;
   if(session.viewNum == null){
       session.viewNum = 0
   }
   session.viewNum ++
    res.json({
        viewNum:session.viewNum
    })
});

module.exports = router;
