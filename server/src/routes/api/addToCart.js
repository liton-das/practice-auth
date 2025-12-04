const { addToCartProdut } = require('../../controllers/addToCart')

const addToCartApi=require('express').Router()

// Add To Cart Produt
addToCartApi.post('/addToCart',addToCartProdut)

module.exports= addToCartApi