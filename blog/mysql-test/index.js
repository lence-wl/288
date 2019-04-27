const  mysql = require('mysql')
// 配置lianjie
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'lence0516',
    port:'3306',
    database:'myblog'
})
// 开始链接
con.connect()

//执行 sql 语句
const  sql = 'select * from users;'
con.query(sql,(err,result) => {
    if(err){
        console.log(err)
        return
    }
    console.log(result[0])
})
// 关闭连接
con.end()
