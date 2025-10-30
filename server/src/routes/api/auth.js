const { registerController, verifyOtpController } = require('../../controllers/authcontroller')

const authApi = require('express').Router()
authApi.post('/register',registerController)
authApi.post('/verifyOtp',verifyOtpController)



module.exports = authApi