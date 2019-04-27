const fs = require('fs')
const  path = require('path')
const fileName = path.resolve(__dirname,'data.txt')  //获取当前文件的完整路径

// 读取文件内容
fs.readFile(fileName,(err,data) => {
    if(err){
        console.error(err)
        return
    }
    console.log(data.toString())
})
