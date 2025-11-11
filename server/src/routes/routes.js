const authApi = require('./api/auth')
const categoryApi = require('./api/categoryApi')

const router = require('express').Router()
router.use('/auth',authApi)
router.use('/category',categoryApi)


module.exports = router