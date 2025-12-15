const { orderController, getAllOrdersController, getAllOrderByCustomer, deleteOrderController } = require('../../controllers/orderControllre')

const orderApi = require('express').Router()
orderApi.post('/checkout-order',orderController)
// get All orders for dashboard 
orderApi.get('/all-orders',getAllOrdersController)
// get all order by customer email
orderApi.get('/customer-all-orders',getAllOrderByCustomer)
//  delete a single order controller 
orderApi.post('/delete-order',deleteOrderController)
module.exports= orderApi