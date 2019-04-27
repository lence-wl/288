const { exec,escape } = require('../db/mysql')



const getList = (author,keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author != '') {
        sql += `and author=${author} `
    }
    if (keyword != '') {
        sql += `and title like ${keyword} `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return exec(sql)
}

const getDetail = (id) => {
    id = escape(id)
    const sql = `select * from blogs where id=${id}`
    // 这里和直接  return exec(sql) 的区别是， 对then 中返回的数据做了删选，同样也是返回了一个promise
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
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
console.log(sql)
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 id title content 属性
    const id = escape(blogData.id)
    const title = escape(blogData.title)
    const content = escape(blogData.content)

    const sql = `update blogs set title=${title}, content=${content} where id=${id};`

    return exec(sql).then(updateData => {
        // console.log('updateData is ', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
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
