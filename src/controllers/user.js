const userModel = require('../models/user')
const helper = require('../helpers/')
const miscHelper = require('../helpers')
const JWT = require('jsonwebtoken')
const { JWT_KEY } = require('../config')

module.exports = {
  register: async (request, response) => {
    try {
      const salt = helper.generateSalt(18)
      const hashPassword = helper.setPassword(request.body.password, salt)
      const data = {
        name: request.body.name,
        username: request.body.username,
        salt: hashPassword.salt,
        password: hashPassword.passwordHash,
        status: request.body.status,
        data_added: new Date(),
        data_updated: new Date()
      }
      const result = await userModel.register(data)
      data.user_id = result.insertId
      response.json(data)
    } catch (error) {
      console.log(error)
    }
  },
  login: async (request, response) => {
    const data = {
      password: request.body.password,
      username: request.body.username
    }

    const usernameValid = await userModel.checkUsername(data.username)
    const dataUser = usernameValid[0]
    console.log(dataUser)
    const hashPassword = helper.setPassword(data.password, dataUser.salt)

    if (hashPassword.passwordHash === dataUser.password) {
      const token = JWT.sign({
        username: dataUser.username,
        user_id: dataUser.user_id
      }, JWT_KEY, { expiresIn: '5h' })

      delete dataUser.salt
      delete dataUser.password

      dataUser.token = token

      response.json(dataUser)
    } else {
      response.json({ message: 'Login error!' })
    }
  },
  getUser: async (request, response) => {
    try {
      const searchName = request.query.name || ''
      const result = await userModel.getUser(searchName)
      response.json(result)
    } catch (error) {
      console.log(error)
    }
  },
  deleteUser: async (request, response) => {
    try {
      const userId = request.params.userId
      const result = await userModel.deleteUser(userId)
      const convert = parseInt(userId)
      miscHelper.response(response, 200, convert)
    } catch (error){
      response.json({ message: 'delete Error'})
    }
  },
  updateUser: async (request, response) => {
    try {
      const salt = helper.generateSalt(18)
      const hashPassword = helper.setPassword(request.body.password, salt)
      const userId = request.params.userId
      const data = {
        name: request.body.name,
        username: request.body.username,
        salt: hashPassword.salt,
        password: hashPassword.passwordHash,
        status: request.body.status,
        data_updated: new Date()
      }
      const result = await userModel.updateUser(data, userId)
      response.json(result)
    } catch (error) {
      console.log(error)
    }
  }
}
