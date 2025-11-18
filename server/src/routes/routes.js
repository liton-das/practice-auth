const authApi = require('./api/auth')
const categoryApi = require('./api/categoryApi')
const productApi = require('./api/product')

const router = require('express').Router()
router.use('/auth',authApi)
router.use('/category',categoryApi)
// product route
router.use('/product',productApi)

module.exports = router