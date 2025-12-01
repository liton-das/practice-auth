const { createCategoryController, updateController, deleteCategoryController, getAllCategoryController, getActiveCategoriesController } = require('../../controllers/categoryController')

const categoryApi= require('express').Router()
const multer  = require('multer')
const verifyToken = require('../../middlewares/verifyToken')
const checkRole = require('../../middlewares/checkRole')
const upload = multer({ dest: 'uploads/' })
categoryApi.post('/addCategory',upload.single('categoryImage'),createCategoryController)
categoryApi.patch('/updateCategory',verifyToken,checkRole(['admin']),upload.single('categoryImage'),updateController)
categoryApi.post('/deleteCategory',verifyToken,checkRole(['admin']),deleteCategoryController)
categoryApi.get('/allCategories',verifyToken,checkRole(['admin','staff']),getAllCategoryController)
categoryApi.get('/activeCategories',getActiveCategoriesController)


module.exports = categoryApi 