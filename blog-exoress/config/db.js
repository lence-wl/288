const env = process.env.NODE_ENV  // 环境参数
// mysql配置
let MYSQL_CONF
// redis 配置
let REDIS_CONF

// 测试环境下
if(env === 'dev'){
    // mysql
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'lence0516',
        port:'3306',
        database:'myblog',
    }
    // redis
    REDIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    }
}

// 生产环境下
if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'lence0516',
        port:'3306',
        database:'myblog',
    }
    // redis
    REDIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF,
}
