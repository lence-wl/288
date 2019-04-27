 // 标准输入输出
//process.stdin.pipe(process.stdout)

 // const http = require('http')
 // const server = http.createServer((req,res) => {
 //     console.log('00000000000')
 //     if(req.method == "POST"){
 //         req.pipe(res)
 //     }
 // })
 // server.listen(8000)

 // stream文件拷贝
 /*const fs = require('fs')
 const path = require('path')

 // 两个文件名  从哪个文件拷贝到哪个文件
 const fileNameFrom = path.resolve(__dirname,'data.txt')
 const fileNameTo = path.resolve(__dirname,'data_bar.txt')

 // 读取文件的stream对象
 let readStream = fs.createReadStream(fileNameFrom)

 // 写入文件的stream对象
 let writeStream = fs.createWriteStream(fileNameTo)
 // 通过pipe连接执行拷贝
 readStream.pipe(writeStream)

 // 拷贝完成的回调
 readStream.on('end',() => {
     console.log('copy already finished')
 })*/

 // 读取一个文件返回给前端
 const fs = require('fs')
 const path = require('path')

 const http = require('http')
 const fileNameFrom = path.resolve(__dirname,'data.txt')
 const server = http.createServer((req,res) => {
     if(req.method == "GET"){
         // 读取文件的stream对象
         let readStream = fs.createReadStream(fileNameFrom)
         readStream.pipe(res)
     }
 })
 server.listen(8000)




