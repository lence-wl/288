const { exec,escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp') // 密码加密

const login = (username, password) => {
    username = escape(username)
    // password = genPassword(password)
    password = escape(password)

    let sql = `select username, realname from users where username=${username} and password=${password}`
    return exec(sql).then(rows => {
        return rows[0]
    })

}
module.exports = {
    login,
}
