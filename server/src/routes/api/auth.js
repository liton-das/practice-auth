const { registerController, verifyOtpController, resendOtpController, loginController, updateProfileController } = require('../../controllers/authcontroller')
const verifyToken = require('../../middlewares/verifyToken')

const authApi = require('express').Router()
authApi.post('/register',registerController)
authApi.post('/verifyOtp',verifyOtpController)
authApi.post('/login',loginController)
authApi.get('/resendOtp',resendOtpController)
authApi.post('/updateProfile',verifyToken,updateProfileController)


module.exports = authApi