const { registerController } = require('../../controllers/authcontroller')

const authApi = require('express').Router()
authApi.post('/register',registerController)



module.exports = authApi