const { exec,escape } = require('../db/mysql')



const getList = async (author,keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author != '') {
        sql += `and author=${author} `
    }
    if (keyword != '') {
        sql += `and title like ${keyword} `
    }
    sql += `order by createtime desc;`

    return await exec(sql)
}

const getDetail = async (id) => {
    id = escape(id)
    const sql = `select * from blogs where id=${id}`
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
    const createTime = Date.now()
    console.log(tags)

    const sql = `
        insert into blogs (title, content, createtime, author, tags, sketch)
        values (${title}, ${content}, ${createTime}, ${author}, ${tags}, ${sketch})
    `
    const insertData = await exec(sql)
    return {
        id : insertData.insertId
    }

}

const updateBlog = async (blogData = {}) => {
    // blogData 是一个博客对象，包含 id title content 属性
    const id = escape(blogData.id)
    const title = escape(blogData.title)
    const content = escape(blogData.content)

    const sql = `update blogs set title=${title}, content=${content} where id=${id};`
    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
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

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
