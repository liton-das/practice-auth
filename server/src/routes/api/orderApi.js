const { orderController, getAllOrdersController, getAllOrderByCustomer } = require('../../controllers/orderControllre')

const orderApi = require('express').Router()
orderApi.post('/checkout-order',orderController)
// get All orders for dashboard 
orderApi.get('/all-orders',getAllOrdersController)
// get all order by customer email
orderApi.get('/customer-all-orders',getAllOrderByCustomer)

module.exports= orderApi