const express = require('express')
const Route = express.Router()

const { order } = require('../controllers/order')

Route
  .post('/', order)
module.exports = Route
