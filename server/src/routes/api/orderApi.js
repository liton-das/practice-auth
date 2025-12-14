const { orderController } = require('../../controllers/orderControllre')

const orderApi = require('express').Router()
orderApi.post('/checkout-order',orderController)

module.exports= orderApi