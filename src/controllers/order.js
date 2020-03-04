const models = require('../models/order')
const helpers = require('../helpers')
const uuid = require('uuid/v4')

module.exports = {
  order: async (request, response) => {
    try {
      const order = request.body
      const transaction_id = uuid()

      const transaction = {
        transaction_id: transaction_id,
        transaction_total: order.transaction_total,
        data_added: new Date()
      }
      models.order(transaction)

      await order.product.map(e => {
        const data = {
          transaction_id: transaction_id,
          product_id: e.product_id,
          quantity: e.quantity,
          data_added: new Date()
        }
        models.order_details(data)
      })

      helpers.response(response, 200, 'transaction success!')
    } catch (error) {
      console.log(error)
      helpers.customErrorResponse(404, 'your request not found')
    }
  }
}
