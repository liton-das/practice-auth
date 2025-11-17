const { createCategoryController, updateController, deleteCategoryController, getAllCategoryController, getActiveCategoriesController } = require('../../controllers/categoryController')

const categoryApi= require('express').Router()
const multer  = require('multer')
const verifyToken = require('../../middlewares/verifyToken')
const upload = multer({ dest: 'uploads/' })
categoryApi.post('/addCategory',verifyToken,upload.single('categoryImage'),createCategoryController)
categoryApi.patch('/updateCategory',verifyToken,upload.single('categoryImage'),updateController)
categoryApi.post('/deleteCategory',verifyToken,deleteCategoryController)
categoryApi.get('/allCategories',verifyToken,getAllCategoryController)
categoryApi.get('/activeCategories',getActiveCategoriesController)


module.exports = categoryApi