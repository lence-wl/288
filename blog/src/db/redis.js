const redis = require('redis')
const { REDIS_CONF } = require('../config/db.js')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error',err => {
})

// 设置值
function set(key,val){
    if(typeof val === 'object' ){
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}
// 获取值
function get(key) {
    const promise = new Promise((resolve,reject) => {
        redisClient.get(key,(err,val) => {
            if(err){
                reject(err)
                return
            }
            if(val == null){
                resolve(null)
                return
            }
            try{
                resolve(
                    JSON.parse(val)
                )
            }catch (ex) {
                resolve(val)

            }

        })
    })

    return promise

}
module.exports = {
    set,
    get
}






