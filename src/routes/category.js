const express = require('express')
const Route = express.Router()

const { getCategory, deleteCategory, updateCategory, insertCategory } = require('../controllers/category')

Route
  .patch('/:categoryId', updateCategory)
  .post('/', insertCategory)
  .delete('/:categoryId', deleteCategory)
  .get('/', getCategory)

module.exports = Route
