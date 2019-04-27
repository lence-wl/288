const fs = require('fs')
const  path = require('path')
const fileName = path.resolve(__dirname,'data.txt')  //获取当前文件的完整路径
// 读取文件内容
/*fs.readFile(fileName,(err,data) => {
    if(err){
        console.error(err)
        return
    }
    console.log(data.toString())
})*/
//  文件写入

/*const content = '这是要写入的内容 \n'
const opt = {
    flag:  'a',  // 追加写入 append , 覆盖用 w ,会把文件清空重新写入
}

fs.writeFile(fileName,content,opt,(err) => {
    if(err){
        console.error(err)
    }
})*/

// 判断文件是否存在
/*fs.exists(fileName,(exist) => {
    console.log('exist',exist)
})*/

