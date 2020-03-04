const crypto = require('crypto')
module.exports = {
  generateSalt: (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
  },

  setPassword: (password, salt) => {
    const hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    const value = hash.digest('hex')
    return {
      salt: salt,
      passwordHash: value
    }
  },
  response: (response, status, data, pagination) => {
    const result = {}

    result.status = status || 200
    result.result = data
    return response.status(result.status).json(result)
  },
  
  customResponse: (response, status, data, pagination) => {
    var page = []
    var result = {}

    for (var i = 1; i <= pagination.totalPages; i++) {
      page[i - 1] = i
    }
    
    result.status = status || 200
    result.result = data
    result.totalpages = page
    console.log(page)

    return response.status(result.status).json(result)
  },

  customErrorResponse: (response, status, message) => {
    const result = {}

    result.status = status || 400
    result.message = message

    return response.status(result.status).json(result)
  }
}
