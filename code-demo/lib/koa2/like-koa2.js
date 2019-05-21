const http = require('http')

// 组合中间件
function compose(middlewareList) {
    return function (ctx) {
        // 中间件调用
        function dispatch(i) {
            // fn为传入的一个个中间件
            const fn = middlewareList[i]
            try {
                return Promise.resolve(
                    // 模拟next执行下一个中间件,这里dispatch函数被当做一个参数，使用bind防止this指向改变
                    fn(ctx, dispatch.bind(null, i + 1))
                )
            }catch (err) {
                return Promise.reject(err)
            }
        }
        return dispatch(0)
    }

}


class LikeKoa2 {
    constructor(){
        this.middlewareList = []
    }

    use(fn){
        this.middlewareList.push(fn)
        return this  //为了可以链式调用
    }
    createContext(req,res){
        const ctx = {
            req,
            res
        }
        ctx.query = req.query
        return ctx
    }
    handleRequest(ctx,fn){
        return fn(ctx)
    }
    callback() {
        const fn = compose(this.middlewareList)
        return (res, req) => {
             const ctx = this.createContext(req,res)
            return this.handleRequest(ctx, fn)
        }
    }

    listen(...args){
        const server = http.createServer(this.callback())
        server.listen(...args)
    }


}

module.exports = LikeKoa2
