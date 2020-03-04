const express = require('express')
const Route = express.Router()

const {
  uploadImages
} = require('../controllers/upload')

const { authentication, authorization } = require('../helpers/auth')

const { getAll, getDetail, insertData, updateData, deleteData } = require('../controllers/product')

Route
  .get('/', getAll)
  .get('/:productId', getDetail)
  .post('/', uploadImages, insertData)
  .patch('/:productId', uploadImages, updateData)
  .delete('/:productId', deleteData)

module.exports = Route
