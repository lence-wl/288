const router = require('koa-router')()
//ctx context 上下文，实际上是require 和 response的集合
router.get('/crossdomain.xml', (ctx, next) => {
    ctx.set('zxzx', 'zxxxxx')
    ctx.status = 200;
    ctx.type = 'xml';
    // ctx.set('Content-Type', 'application/xml')
    // ctx.set('X-Frame-Options', 'SAMEORIGIN')
    // ctx.set('ETag', "5b5b0cb1-105")
    // ctx.set('Cache-Control', "no-cache")
    // ctx.set('Accept-Ranges', "bytes")
    // ctx.set('Connection', "keep-alive")
    // const Expires = 'Thu, 23 May 2018 08:22:58 GMT'
    // console.log(Expires)
    // ctx.set('Expires', "Thu, 23 May 2017 08:22:58 GMT")
    // ctx.set('X-WAF-UUID', "d2fb9b9d-479e-4963-8e8b-af108eb95714")
    // ctx.set('X-Via', "1.1 zhouwangtong151:0 (Cdn Cache Server V2.0), 1.1 PSjlybwtgo131:1 (Cdn Cache Server V2.0), 1.1 tong14:4 (Cdn Cache Server V2.0)")

    // a
    // 1
    // Accept-Ranges
    // bytes
    // Cache-Control
    // no-cache
    // Connection
    // keep-alive
    // Content-Length
    // 261
    // Content-Type
    // text/xml; charset=utf-8
    // Date
    // Thu, 23 May 2019 10:10:28 GMT
    // ETag
    // "5b5b0cb1-105"
    // Expires
    // Thu, 23 May 2019 10:10:27 GMT
    // Last-Modified
    // Fri, 27 Jul 2018 12:14:41 GMT
    // Server
    // waf/2.14.2-2.el6
    // X-Frame-Options
    // SAMEORIGIN
    // X-Via
    // 1.1 PShbsjzsxbz117:0 (Cdn Cach…n12:4 (Cdn Cache Server V2.0)
    // X-WAF-UUID
    // a6cb0375-780d-4c9c-8d89-0a48c666fc9d




    ctx.body = "<?xml version=\"1.0\"?>\n" +
        "<!DOCTYPE cross-domain-policy SYSTEM \"http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd\">\n" +
        "<cross-domain-policy>\n" +
        "<allow-access-from domain=\"*\" />\n" +
        "<allow-http-request-headers-from domain=\"*\" headers=\"*\"/>\n" +
        "</cross-domain-policy>\n"

    next()
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
