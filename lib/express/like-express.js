const http = require('http');
const slice = Array.prototype.slice;

class  LikeExpress {
    constructor(){
        this.routes = {
            all : [],    // 存放通过 use 注册的中间件
            get : [],    // 存放通过 get 注册的中间件
            post : [],   // 存放通过 post 注册的中间件
        }
    }
    // 注册中间件的方法
    register(path){
        const info = {}
        if(typeof path === 'string'){  // 如果第一个参数是字符串格式的路由地址
            info.path = path;
            info.stack = slice.call(arguments,1)  //从第二个参数开始转换为数组，保存到stack,就是保存的中间件方法
        }else{
            info.path = '/'   // 根路由会命中多有的路由
            info.stack = slice.call(arguments,0) // 保存中间件方法 // 为什么要用 call ?????
        }
        return info
    }

    use(){
        const info = this.register.apply(this,arguments)  // 为什么要用 apply ?????
        this.routes.all.push(info)
    }

    get(){
        const info = this.register.apply(this,arguments)  // 为什么要用 apply ?????
        this.routes.get.push(info)
    }

    post(){
        const info = this.register.apply(this,arguments)  // 为什么要用 apply ?????
        this.routes.post.push(info)
    }

    match(method,url){
        let stack = []
        if(url === '/favicon.ico'){
            return stack
        }
        // 获取 routes
        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all)
        curRoutes = curRoutes.concat(this.routes[method])

        curRoutes.forEach(routeInfo => {
            if(url.indexOf(routeInfo) === 0){  // 正确匹配需要执行
                stack = stack.concat(routeInfo.stack)

            }
        })

    }
    // 核心的 next 机制
    handle(req,res,stack){
        const  next = () => {
            // 获取第一个匹配的中间件函数
            const middleware = stack.shift()
            if(middleware){
                //执行中间件函数
                middleware(req,res,next( ))
            }
        }
    }

    callback(){
        return (req,res) => {
            res.json = (data) => {
                res.setHeader('Content-type','application/json')
                res.end(
                    JSON.stringify(data)
                )
            }
            // 用 url 和 method 来匹配路由，来决定哪些中间件函数需要执行
            const url = req.url;
            const method = req.method.toLowerCase();

            // 保存需要执行的中间件函数
            const resultList = this.match(method,url)
        }
    }
    listen(...args){
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = () => {
    return new LikeExpress()
}
