const uploadCloudinary = require("../config/cloudinary")
const { skuGenerator, slugGenerator } = require("../helpers/skuGenerator")
const products = require("../model/products")

const addProductController = async(req,res)=>{
    try {
        const {title,price,varient,categoryId,description,review,discountPrice,tags,stock}=req.body
        // console.log(title,price,varient,categoryId,description,review,discountPrice,tags,stock)
        const sku = skuGenerator(title)
        const slug = slugGenerator(title)
        // upload thumbnail image
        const thumbnail = req.files.thumbnail[0].path
        const thumbImg = await uploadCloudinary(thumbnail)
        const images =req.files.subImages?.map((item)=>{
            return item.path
        })
        // upload subImages 
        const subImgs=await Promise.all(images?.map(async(item)=>{
            const subImages =await uploadCloudinary(item)
            return subImages
        }))
        // all data save to the database
       await new products({
            title,
            thumbnail:thumbImg,
            subImages:subImgs,
            price,
            varient:JSON.parse(varient),
            categoryId,
            description,
            review:JSON.parse(review),
            discountPrice,
            tags,
            stock,
            sku,
            slug
        }).save()
    return res.status(201).json({message:'Product added successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error',error})
    }
}
// update product controller 
const updateProduct = async(req,res)=>{
    try {
        const {
            productId,
            title,
            price,
            varient,
            categoryId,
            description,
            review,
            discountPrice,
            tags,
            stock
        } = req.body
        const existProduct = await products.findOne({_id:productId})
        if(!existProduct) return res.status(400).json({message:'Exist product not found!'})
        if(title){
            existProduct.title=title
        }

       await existProduct.save()
    return res.status(200).json({message:'product updated successfully',existProduct})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error'})
    }
}
// update admin approval controller 
const updateAdminApprovalStatus = async(req,res)=>{
    try {
        const {productId,status}=req.body
        if(status != 'approved' && status != 'cancle') return res.status(400).json({message:'Please select between approved or cancle!'})
        await products.findByIdAndUpdate(productId,{adminApproval:status})
        return res.status(200).json({message:`${status} updated successfully`})
        } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error',error})
    }
}

// delete product controller 
const deleteProductController = async(req,res)=>{
    try {
        const {productId}=req.body
        await products.findByIdAndDelete(productId)
        return res.status(200).json({message:'Product deleted successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error!'})
    }
}
module.exports={
    addProductController,
    updateAdminApprovalStatus,
    deleteProductController,
    updateProduct
}