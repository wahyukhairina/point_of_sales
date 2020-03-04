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
  },
  getUser: (searchName) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM user WHERE name LIKE '%${searchName}%'`, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM user WHERE user_id = ?', userId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  updateUser: (data, userId) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE user SET ? WHERE user_id = ?', [data, userId], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}
