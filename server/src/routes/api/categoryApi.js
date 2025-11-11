const { createCategoryController, updateController } = require('../../controllers/categoryController')

const categoryApi= require('express').Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
categoryApi.post('/addCategory',upload.single('categoryImage'),createCategoryController)
categoryApi.patch('/updateCategory',updateController)


module.exports = categoryApi