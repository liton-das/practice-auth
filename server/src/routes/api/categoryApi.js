const { createCategoryController } = require('../../controllers/categoryController')

const categoryApi= require('express').Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
categoryApi.post('/addCategory',upload.single('categoryImage'),createCategoryController)


module.exports = categoryApi