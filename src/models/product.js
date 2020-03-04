const connection = require('../config/mysql')

module.exports = {
  count: (data) => {
    const name = data.seacrhName
    const limit = data.limit
    const page = data.page
    return new Promise((resolve, reject) => {
      connection.query('SELECT count(*) as totalData from product', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result[0].totalData)
      })
    })
  },

  getAll: (data) => {
    const sort = data.sort
    const type = data.type
    const name = data.searchName
    const page = data.page
    const limit = data.limit
    // const pageInt = parseInt(page, 10)
    // const limitInt = parseInt(limit, 10)
    return new Promise((resolve, reject) => {
      connection.query(`SELECT product.id as id, product.name, product.desc as description, product.image as image, product.price as price,  product.stock, category.name as category, product.data_added, product.data_updated from product INNER JOIN category WHERE category.id = product.category AND product.name LIKE '%${name}%' ORDER BY ${sort} ${type} LIMIT ${page},${limit}`, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  searchProduct: (seacrhName) => {
    return new Promise((resolve, reject) => {
      const name = seacrhName
      connection.query('SELECT product.product_code as id, product.name as name, product.desc as description, product.photo as image, product.price as price,  product.stock, category.name, product.data_added, product.data_updated from product INNER JOIN category WHERE product.category = category.id AND product.name LIKE "%' + name + '%"', (error, result) => {
        if (error) reject(new Error(error))

        resolve(result)
      })
    })
  },

  sortData: (sort, type) => {
    console.log(sort)
    return new Promise((resolve, reject) => {
      connection.query(`SELECT product.product_code as id, product.name as name, product.desc as description, product.photo as image, product.price as price,  product.stock, category.name, product.data_added, product.data_updated from product INNER JOIN category WHERE product.category = category.id ORDER BY '${sort}' '${type}'`, (error, result) => {
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
      connection.query('UPDATE product SET ? WHERE id = ?', [data, productId], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteData: (productId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM product WHERE id = ?', productId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}
