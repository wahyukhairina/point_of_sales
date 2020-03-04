const categoryModel = require('../models/category')
const miscHelper = require('../helpers')

module.exports = {
  getCategory: async (request, response) => {
    try {
      const searchName = request.query.name || ''
      const result = await categoryModel.getCategory(searchName)
      response.json(result)
    } catch (error) {
      console.log(error)
    }
  },
  deleteCategory: async (request, response) => {
    try {
      const categoryId = request.params.categoryId
      const result = await categoryModel.deleteCategory(categoryId)
      response.json(result)
    } catch (error) {
      response.json({ message: 'delete Error' })
    }
  },
  insertCategory: async (request, response) => {
    try {
      const data = {
        name: request.body.name,
        data_added: new Date(),
        data_updated: new Date()
      }
      const result = await categoryModel.insertCategory(data)
      miscHelper.response(response, 200, data)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'extention not supported!')
    }
  },
  updateCategory: async (request, response) => {
    try {
      const data = {
        name: request.body.name,
        data_updated: new Date()
      }
      const categoryId = request.params.categoryId
      const result = await categoryModel.updateCategory(data, categoryId)
      miscHelper.response(response, 200, data)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  }
}
