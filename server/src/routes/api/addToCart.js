const { addToCartProdut, deleteCartController, getCartController } = require('../../controllers/addToCart')

const addToCartApi=require('express').Router()

// Add To Cart Produt
addToCartApi.post('/addToCart',addToCartProdut)
addToCartApi.post('/deleteCart',deleteCartController)
addToCartApi.get('/get-cart',getCartController)

module.exports= addToCartApi