const { registerController, verifyOtpController, resendOtpController, loginController } = require('../../controllers/authcontroller')

const authApi = require('express').Router()
authApi.post('/register',registerController)
authApi.post('/verifyOtp',verifyOtpController)
authApi.post('/login',loginController)
authApi.get('/resendOtp',resendOtpController)



module.exports = authApi