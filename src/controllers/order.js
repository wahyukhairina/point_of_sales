const models = require('../models/order')
const helpers = require('../helpers')
const uuid = require('uuid/v4')
const moment = require('moment');

module.exports = {
  order: async (request, response) => {
    try {
      const order = request.body
      const transaction_id = uuid()

      const transaction = {
        transaction_id: transaction_id,
        transaction_total: order.total,
        data_added: new Date()
      }
      console.log(transaction)
      models.order(transaction)
      await order.product.map(e => {
        const data = {
          transaction_id: transaction_id,
          product_id: e.id,
          quantity: e.qty,
          data_added: new Date()
        }
        models.order_details(data)
      })

      helpers.response(response, 200, 'transaction success!')
    } catch (error) {
      console.log(error)
      helpers.customErrorResponse(404, 'your request not found')
    }
  },

  getHistory: async (request, response) => {
    try {
      const date = new Date()
      const start = request.query.start || date
      const end = request.query.end || date
      const startDate = moment(new Date(start)).format('YYYY-MM-DD')
      const endDate = moment(new Date(end)).format('YYYY-MM-DD')
      const result = await models.getHistory(startDate, endDate)
      response.json(result)
    } catch (error) {
      console.log(error)
    }
  }
}
