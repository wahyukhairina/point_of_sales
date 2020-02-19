const express = require('express')
const Route = express.Router()
const productRouter = require('./product')
const userRouter = require('./user')
// const user = require('./user')

Route
  .use('/product', productRouter)
  .use('/uploads', express.static('./uploads'))
  .use('/user', userRouter)
module.exports = Route