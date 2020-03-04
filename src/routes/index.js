const express = require('express')
const Route = express.Router()
const productRouter = require('./product')
const userRouter = require('./user')
const categoryRouter = require('./category')

Route
  .use('/product', productRouter)
  .use('/uploads', express.static('./uploads'))
  .use('/user', userRouter)
  .use('/category', categoryRouter)
module.exports = Route
