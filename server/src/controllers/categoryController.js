const category = require("../model/category")
const cloudinary = require('cloudinary').v2
// create category controller
// Configuration
    cloudinary.config({ 
        cloud_name: 'dwjtuk5wr', 
        api_key: '596796834932469', 
        api_secret: 'w3rPiEZ1uAY5ZNJTAQJh8-A80sg' // Click 'View API Keys' above to copy your API secret
    });
const createCategoryController =async (req,res,next)=>{
    try {
        const {categoryName,createdBy}=req.body
        if(!categoryName && !createdBy)return res.status(403).json({message:'All field are requried!'})
        const existsCategory = await category.findOne({categoryName})
        if(existsCategory) return res.status(400).json({message:'Category already exists!'})
        const uploadResult = await cloudinary.uploader.upload(
            req.file.path,
            {
                public_id:Date.now()
            }
        )
       const categorys = new category({
            categoryName,
            categoryImage:uploadResult.url,
            createdBy
        })
        await categorys.save()
        return res.status(200).json({message:'Creategory created successfully!'})
    } catch (error) {
        res.status(500).json({message:'Internal server error',error})
    }
}

// update category controller

// delete category controller

// get category controller


module.exports={
    createCategoryController
}