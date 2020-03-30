const express = require('express')
const Route = express.Router()

const { order, getHistory } = require('../controllers/order')

Route
  .post('/', order)
  .get('/', getHistory)
module.exports = Route
