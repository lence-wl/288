const moment = require('moment')
const { exec,escape } = require('../db/mysql')
const getList = async (author,keyword,createtime,tags) => {
    //SELECT id,DATE_FORMAT(date1,'%Y-%m-%d %H:%i:%s') As date1,
    // DATE_FORMAT(date2,'%Y-%m-%d %H:%i:%s') As date2 FROM test;
    let sql = `select id as 'key',title,author, createtime,views,tags,sketch,isrec  from blogs where 1=1 `
    // 按作者
    if (author) {
        sql += `and author=${author} `
    }
    // 关键字
    if (keyword != '') {
        sql += `and title like ${escape(`%${keyword}%`)}`
    }
    // 发布时间
    if (createtime != '') {
        sql += `and createtime like  ${escape(`%${createtime}%`)}`
    }
    // 标签
    if (tags != '') {
        sql += `and tags like ${escape(`%${tags}%`)} `
    }
    sql += `order by timestamp desc;`
console.log(sql)
    return await exec(sql)
}

const getDetail = async (id) => {
    id = escape(id)
    const sql = `select * from blogs where id=${id}`
    console.log(sql)
    // 这里和直接  return exec(sql) 的区别是， 对then 中返回的数据做了删选，同样也是返回了一个promise
    const rows = await exec(sql)
    return rows[0]
}

const newBlog = async (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author 属性
    console.log(blogData)
    const title = escape(blogData.title)
    const content = escape(blogData.content)
    const tags = escape(blogData.tags.toString())
    const sketch = escape(blogData.sketch)
    const author = escape(blogData.author)
    const timestamp = escape(new Date().getTime())
    const createTime =escape(moment().format('YYYY-MM-DD'))
    const sql = `
        insert into blogs (title, content, createtime, author, tags, sketch, timestamp)
        values (${title}, ${content}, ${createTime}, ${author}, ${tags}, ${sketch}, ${timestamp})
    `
    const insertData = await exec(sql)
    return {
        id : insertData.insertId
    }

}

const updateBlog = async (blogData = {}) => {
    // blogData 是一个博客对象，包含 id title content 属性

    //说明是新曾或者编辑
    const id = escape(blogData.id)
    let sql;
    // 编辑或者新增
    if(blogData.title){
        const title = escape(blogData.title)
        const content = escape(blogData.content)
        const tags = escape(blogData.tags)
        const sketch = escape(blogData.sketch)
        sql = `update blogs set title=${title}, content=${content}, tags=${tags}, sketch=${sketch} where id=${id};`
    }else{ // 置顶
        const timestamp = new Date().getTime()
        sql = `update blogs set timestamp=${timestamp} where id=${id};`
    }
    const updateData = await exec(sql)
    return updateData.affectedRows > 0;
}

const delBlog = async (id, author) => {
    // id 就是要删除博客的 id
    id = escape(id)
    author = escape(author)
    const sql = `delete from blogs where id=${id} and author=${author};`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const setRecommend = async (blogData) => {
    // id 就是要删除博客的 id
    const id = escape(blogData.id)
    const isrec = escape(blogData.isrec)
    const sql = `update blogs set isrec=${isrec}  where id=${id};`
    console.log(sql)
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
    setRecommend,
}
