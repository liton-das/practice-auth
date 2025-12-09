const addToCartApi = require('./api/addToCart')
const authApi = require('./api/auth')
const categoryApi = require('./api/categoryApi')
const copunApi = require('./api/coupon')
const productApi = require('./api/product')

const router = require('express').Router()
router.use('/auth',authApi)
router.use('/category',categoryApi)
// product route
router.use('/product',productApi)
// Add to cart Api 
router.use('/cart',addToCartApi)
// add copun api
router.use('/copun',copunApi)
module.exports = router