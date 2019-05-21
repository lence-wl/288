const fs = require('fs')
const path= require('path')

// 写日志 = 写入流 + 日志内容
function writeLog(writeStream,log) {
    writeStream.write(log + '\n')

}
// 生成 写入流
function createWriteStream(fileName){
    const fullFileName = path.join(__dirname,'../','../','logs',fileName)
    const writeStream = fs.createWriteStream(fullFileName,{
        flag:'a'
    })
    return writeStream
}
// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStream,log)
}
module.exports = {
    access
}
