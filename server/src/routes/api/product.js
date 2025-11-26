const { addProductController, updateAdminApprovalStatus } = require('../../controllers/productController')
const upload = require('../../middlewares/multer')

const productApi=require('express').Router()
productApi.post('/add-product',upload.fields([{name:'thumbnail',maxCount:1},{name:'subImages',maxCount:5}]),addProductController)
productApi.patch('/update-status',updateAdminApprovalStatus)



module.exports = productApi