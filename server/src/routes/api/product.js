const { addProductController, updateAdminApprovalStatus, deleteProductController, updateProduct, dashboardController, publicDashboardController, reviewController, getSingleProductController } = require('../../controllers/productController')
const checkRole = require('../../middlewares/checkRole')
const upload = require('../../middlewares/multer')
const verifyToken = require('../../middlewares/verifyToken')

const productApi=require('express').Router()
productApi.post('/add-product',verifyToken,checkRole(['admin','staff']),upload.fields([{name:'thumbnail',maxCount:1},{name:'subImages',maxCount:5}]),addProductController)
productApi.patch('/update-status',verifyToken,checkRole(['admin']),updateAdminApprovalStatus)
productApi.post('/update-product',verifyToken,checkRole(['admin']),upload.fields([{name:'thumbnail',maxCount:1},{name:'subImages',maxCount:5}]),updateProduct)
productApi.delete('/delete-product',verifyToken,checkRole(['admin']),deleteProductController)
productApi.get('/dashboard-product',verifyToken,checkRole(['admin','staff']),dashboardController)
productApi.get('/public-dashboard-product',publicDashboardController)
productApi.post('/review-product',reviewController)
productApi.get('/get-single-product/:slug',getSingleProductController)


module.exports = productApi