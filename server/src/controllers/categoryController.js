const category = require("../model/category")
const cloudinary = require('cloudinary').v2
const fs = require('fs')
// create category controller
// Configuration
    cloudinary.config({ 
        cloud_name: 'dwjtuk5wr', 
        api_key: '596796834932469', 
        api_secret: 'w3rPiEZ1uAY5ZNJTAQJh8-A80sg' // Click 'View API Keys' above to copy your API secret
    });
const createCategoryController =async (req,res)=>{
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
        fs.unlinkSync(req.file.path)
        return res.status(200).json({message:'Creategory created successfully!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal server error',error})
    }
}

// update category controller
const updateController = async (req, res) => {
   
  try {
    const { categoryId, updateStatus } = req.body
    console.log(categoryId,updateStatus)
    if (!categoryId) return res.status(404).json({ message: "Category id is required!" });
    if (updateStatus != "approved" && updateStatus != "cancel")
      return res.status(403).json({ message: "Please select approved and cancel" });
    await category.findByIdAndUpdate(categoryId, { adminApproval: 'cancel' });
    return res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error!",error });
  }
};

// delete category controller
const deleteCategoryController = async(req,res)=>{
    try {
        const {categoryId}=req.body
        await category.findByIdAndDelete({categoryId})
        
        
        return res.status(200).json({message:'Category deleted successfully'})
    } catch (error) {
        return res.status(500).json({message:'Internal server error',error})
    }
}
// get category controller for admin
const getAllCategoryController =async(req,res)=>{
    try {
        const categories = await category.find()
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({message:'Internal server error!'})
    }
}
// get Active Category controller for public
const getActiveCategoriesController =async(req,res)=>{
    try {
        const approvedCategories = await category.find({adminApproval:'approved'})
        return res.status(200).json(approvedCategories)
    } catch (error) {
        return res.status(500).json({message:'Internal server error',error})
    }
}

module.exports={
    createCategoryController,
    updateController,
    deleteCategoryController,
    getAllCategoryController,
    getActiveCategoriesController
}