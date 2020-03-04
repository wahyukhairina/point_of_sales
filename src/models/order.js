const connection = require('../config/mysql')

module.exports = {
  order: (transaction) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO transaction SET ?', transaction, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  order_details: (data) => {
    return new Promise((resolve, reject) => {
      console.log(data)
      connection.query('INSERT INTO transaction_details SET ?', data, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}
