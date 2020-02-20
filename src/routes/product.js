const express = require('express')
const Route = express.Router()

const {
  uploadFiles
} = require('../controllers/upload')

const { authentication, authorization } = require('../helpers/auth')

const { getAll, getDetail, insertData, updateData, deleteData } = require('../controllers/product')

Route
  .get('/', authentication, authorization, getAll)
  .get('/:productId', authentication, authorization, getDetail)
  .post('/', uploadFiles, authentication, authorization, insertData)
  .patch('/:productId', authentication, authorization, uploadFiles, updateData)
  .delete('/:productId', authentication, authorization, deleteData)

module.exports = Route
