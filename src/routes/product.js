const express = require('express')
const Route = express.Router()

const {
  uploadFiles
} = require('../controllers/upload')

const { authentication, authorization } = require('../helpers/auth')

const { getAll, getDetail, insertData, updateData, deleteData } = require('../controllers/product')

Route
  .get('/', authentication, authorization, getAll)
  .get('/:productId', getDetail)
  .post('/', uploadFiles, insertData)
  .patch('/:productId', updateData)
  .delete('/:productId', deleteData)

module.exports = Route
