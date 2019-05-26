const { exec,escape } = require('../db/mysql')
const getList = async (tagType,state) => {
    let sql = `select id as 'key' , tag , tagType , state from tags where 1=1 `
    if (tagType !== undefined) {
        sql += `and tagType=${tagType} `
    }
    if (state !== undefined) {
        sql += `and state=${state} `
    }
    sql += `order by id;`
    console.log(sql)
    return await exec(sql)
}

const newTag = async (tagData = {}) => {
    // tagData ，包含 tag , tagType , state 属性
    console.log(tagData)
    const tag = escape(tagData.tag)
    const tagType = escape(tagData.tagType)
    const sql = `
        insert into tags (tag, tagType, state)
        values (${tag}, ${tagType}, 1)
    `
    const insertData = await exec(sql)
    return {
        id : insertData.insertId
    }
}

const delTag = async (id) => {
    id = escape(id)
    const sql = `delete from tags where id=${id};`
    console.log(sql)
    return exec(sql).then(delData => {
        return delData.affectedRows > 0;
    })
}

const changeState = async (id, state) => {
    id = escape(id)
    state = escape(state)
    const sql = `update tags set state=${state} where id=${id};`
    return exec(sql).then(delData => {
        return delData.affectedRows > 0;
    })

}

module.exports = {
    getList,
    newTag,
    delTag,
    changeState,
}
