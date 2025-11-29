const { addProductController, updateAdminApprovalStatus, deleteProductController, updateProduct, dashboardController } = require('../../controllers/productController')
const checkRole = require('../../middlewares/checkRole')
const upload = require('../../middlewares/multer')
const verifyToken = require('../../middlewares/verifyToken')

const productApi=require('express').Router()
productApi.post('/add-product',upload.fields([{name:'thumbnail',maxCount:1},{name:'subImages',maxCount:5}]),addProductController)
productApi.patch('/update-status',verifyToken,checkRole(['admin']),updateAdminApprovalStatus)
productApi.post('/update-product',upload.fields([{name:'thumbnail',maxCount:1},{name:'subImages',maxCount:5}]),updateProduct)
productApi.delete('/delete-product',verifyToken,checkRole(['admin']),deleteProductController)
productApi.get('/dashboard-product',dashboardController)



module.exports = productApi