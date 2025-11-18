const { addProductController } = require('../../controllers/productController')

const productApi=require('express').Router()
productApi.post('/add-product',addProductController)



module.exports = productApi