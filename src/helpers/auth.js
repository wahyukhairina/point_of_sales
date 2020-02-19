const JWT = require('jsonwebtoken')
const { JWT_KEY } = require('../config')

module.exports = {
  authentication: (request, response, next) => {
    const headerToken = request.headers.authorization
    const user_id = request.headers['user-id']
    console.log(user_id)
    if (headerToken === undefined) {
      response.json({ message: 'Please provide Token!' })
    } else {
      request.token = headerToken
      request.user_id = user_id
      next()
    }
  },
  authorization: (request, response, next) => {
    const token = request.token
    const user_id = request.user_id
    JWT.verify(token, JWT_KEY, (error, decoded) => {
      if (error && error.name === 'TokenExpiredError') response.json({ message: 'Token Expired!' })
      if (error && error.name === 'JsonWebTokenError') response.json({ message: 'Token Error!' })
      if (parseInt(user_id) !== parseInt(decoded.user_id)) response.json({ message: 'You\'re Unauthorized!' })
      next()
    })
  }
}
