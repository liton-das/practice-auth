const authApi = require('./api/auth')

const router = require('express').Router()
router.use('/auth',authApi)


module.exports = router