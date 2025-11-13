const { createCategoryController, updateController, deleteCategoryController, getAllCategoryController, getActiveCategoriesController } = require('../../controllers/categoryController')

const categoryApi= require('express').Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
categoryApi.post('/addCategory',upload.single('categoryImage'),createCategoryController)
categoryApi.patch('/updateCategory',upload.single('categoryImage'),updateController)
categoryApi.post('/deleteCategory',deleteCategoryController)
categoryApi.get('/allCategories',getAllCategoryController)
categoryApi.get('/activeCategories',getActiveCategoriesController)


module.exports = categoryApi