const express = require('express')
const Route = express.Router()

const { register, login, deleteUser, getUser, updateUser } = require('../controllers/user')

Route
  .post('/register', register)
  .post('/login', login)
  .delete('/:userId', deleteUser)
  .get('/', getUser)
  .patch('/:userId', updateUser)

module.exports = Route
