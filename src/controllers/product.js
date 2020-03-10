const productModel = require('../models/product')
const miscHelper = require('../helpers')
const uuid = require ('uuid/v4')

module.exports = {
  getAll: async (request, response) => {
    try {
      const searchName = request.query.searchName || ''
      const sort = request.query.sort || 'product.name'
      const type = request.query.type || 'ASC'
      const pagequery = request.query.page
      const page = (pagequery - 1) || 0
      const limit = request.query.limit || 6
      const data = {
        searchName,
        sort,
        type,
        page,
        limit
      }
      const totalData = await productModel.count(data)
     
      // console.log(pages)
      const result = await productModel.getAll(data)
      const totalPages = Math.ceil(totalData / limit)
      const pager = {
        totalPages
      }
      miscHelper.customResponse(response, 200, result, pager)

    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 400, 'Internal server error')
    }
  },
  getDetail: async (request, response) => {
    try {
      const productId = request.params.productId
      const result = await productModel.getDetail(productId)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },

  insertData: async (request, response) => {
    try {
      let id = uuid()
      const data = {
        id,
        name: request.body.name,
        desc: request.body.desc,
        image: `http://localhost:8006/uploads/${request.file.filename}`,
        price: request.body.price,
        category: request.body.category,
        stock: request.body.stock,
        data_added: new Date(),
        data_updated: new Date()
      }
      const result = await productModel.insertData(data)
      miscHelper.response(response, 200, data)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'extention not supported!')
    }
  },

  updateData: async (request, response) => {
    try {
      const productId = request.params.productId
      const data = {

        name: request.body.name,
        desc: request.body.desc,
        image: `http://localhost:8006/uploads/${request.file.filename}`,
        price: request.body.price,
        category: request.body.category,
        stock: request.body.stock,
        data_updated: new Date()
      }
      
      const result = await productModel.updateData(data, productId)
      const hasil = {
        productId,
        name: request.body.name,
        desc: request.body.desc,
        image: `http://localhost:8006/uploads/${request.file.filename}`,
        price: request.body.price,
        category: request.body.category,
        stock: request.body.stock,
        data_updated: new Date()
      }
      miscHelper.response(response, 200, hasil)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  deleteData: async (request, response) => {
    try {
      const productId = request.params.productId
      const result = await productModel.deleteData(productId)
      // const iniid = parseInt(productId)
      miscHelper.response(response, 200, productId)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  }
}
