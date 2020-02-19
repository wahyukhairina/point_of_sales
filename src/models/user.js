const connection = require('../config/mysql')

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', data, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  checkUsername: (username) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM user WHERE username = '${username}'`, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}
