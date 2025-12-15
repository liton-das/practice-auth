const { orderController, getAllOrgersController } = require('../../controllers/orderControllre')

const orderApi = require('express').Router()
orderApi.post('/checkout-order',orderController)
// get All orders for dashboard 
orderApi.get('/all-orders',getAllOrgersController)

module.exports= orderApi