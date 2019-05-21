// 用promise 获取文件内容
const path = require('path')
const fs = require('fs')

function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, fileName)
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}

/*getFileContent('a.json').then(aData => {
    console.log('a data',aData)
    return getFileContent(aData.next)
}).then(bData => {
    console.log("b data",bData)
    return getFileContent(bData.next)
}).then(cData => {
    console.log('c data',cData)
})*/

// 在函数中使用 await 该函数必须使用 async 声明为异步函数
async function readFileData() {
    // getFileContent 函数返回一个promise ，await 关键字 可以直接把 promise
    // 中的 resolve函数的执行结果取出保存在变量中
    try{
        const aData = await getFileContent('a.json')
        console.log('a data', aData)
        const bData = await getFileContent(aData.next)
        console.log('b data', bData)
        const cData = await getFileContent(bData.next)
        console.log('c data', cData)
    }catch (err) {
        console.error(err)
    }
}

readFileData()

//async 异步函数的执行结果还是一个 promise

async function readAData() {
    const aData = await getFileContent('a.json')
    return aData
}
async function test() {
    const aData = await readAData()
    console.log(aData)
}
test()

/*
* 1. await 后面可以追加 promise 对象，获取resolve 的值
* 2. await 必须包裹在 async 函数中
* 3. async 函数返回的也是一个 promise 对象
* 4. try-catch 可以截获promise 中reject 的值
* */
