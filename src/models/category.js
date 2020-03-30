const connection = require('../config/mysql')

module.exports = {
  getCategory: (searchName) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM category WHERE name LIKE '%${searchName}%'`, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteCategory: (categoryId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM category WHERE id = ?', categoryId, (error) => {
        if (error) reject(new Error(error))
        connection.query('SELECT * FROM   category', (error, result) => {
          if (error) reject (new Error(error))
          resolve(result)
        })
      })
    })
  },
  insertCategory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO category SET ?', data, (error) => {
        if (error) reject(new Error(error))
        connection.query('SELECT * FROM   category', (error, result) => {
          if (error) reject (new Error(error))
          resolve(result)
        })
      })
    })
  },
  updateCategory: (data, categoryId) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE category SET ? WHERE id = ?', [data,categoryId], (error, result) => {
        if (error) reject(new Error(error))
        connection.query('SELECT * FROM   category', (error, result) => {
          if (error) reject (new Error(error))
          resolve(result)
        })
      })
    })
  }
}
