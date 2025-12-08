const { addToCartProdut, deleteCartController } = require('../../controllers/addToCart')

const addToCartApi=require('express').Router()

// Add To Cart Produt
addToCartApi.post('/addToCart',addToCartProdut)
addToCartApi.post('/deleteCart',deleteCartController)

module.exports= addToCartApi