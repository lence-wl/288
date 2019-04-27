const serverHandle = require('../app')
const http = require('http');
const PORT = 8000
const server = http.createServer(serverHandle) //接收一个函数，该函数有req 、 res两个参数，分别保存请求信息和响应信息
server.listen(PORT)
console.log('服务器已启动...监听'+PORT+'端口')
