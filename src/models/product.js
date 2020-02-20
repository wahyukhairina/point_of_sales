const connection = require('../config/mysql')

module.exports = {
  getAll: (data) => {
    const sort = data.sort
    const searchName = data.searchName
    const page = data.page
    const limit = data.limit
    return new Promise((resolve, reject) => {
      if (page != null) {
        const pagination = (page * limit) - limit
        connection.query('SELECT product.product_code as id, product.product_name as name, product.desc as description, product.photo as image, product.price as price,  product.stock, category.category_name as category, product.data_added, product.data_updated from product INNER JOIN category WHERE product.category = category.category_code LIMIT ' + pagination + ',' + limit, (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      } else if (sort != null) {
        connection.query(`SELECT product.product_code as id, product.product_name as name, product.desc as description, product.photo as image, product.price as price,  product.stock, category.category_name, product.data_added, product.data_updated from product INNER JOIN category WHERE product.category = category.category_code ORDER by ${sort} ASC`, (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      } else if (searchName != null) {
        connection.query('SELECT product.product_code as id, product.product_name as name, product.desc as description, product.photo as image, product.price as price,  product.stock, category.category_name, product.data_added, product.data_updated from product INNER JOIN category WHERE product.category = category.category_code AND product_name LIKE "%' + searchName + '%"', (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      } else {
        connection.query('SELECT product.product_code as id, product.product_name as name, product.desc as description, product.photo as image, product.price as price,  product.stock, category.category_name as category, product.data_added, product.data_updated from product INNER JOIN category WHERE product.category = category.category_code', (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      }
    })
  },

  sortData: (column) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM product ORDER BY ${column} ASC`, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  getDetail: (productId) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product WHERE product_code = ?', productId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  insertData: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO product SET ?', data, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  updateData: (data, productId) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE product SET ? WHERE product_code = ?', [data, productId], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteData: (productId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM product WHERE product_code = ?', productId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}
