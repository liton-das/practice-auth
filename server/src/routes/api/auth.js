const { registerController, verifyOtpController, resendOtpController } = require('../../controllers/authcontroller')

const authApi = require('express').Router()
authApi.post('/register',registerController)
authApi.post('/verifyOtp',verifyOtpController)
authApi.get('/resendOtp',resendOtpController)



module.exports = authApi