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
        console.log('iam thumbnail',thumbImg)
        const images =req.files.subImages?.map((item)=>{
            return item.path
        })
        // upload subImages 
        const subImgs= Promise.all( images?.map(async(item)=>{
            const subImages =await uploadCloudinary(item)
            return subImages
        }))
        console.log('iam subImages',subImgs)
        return res.send('success')
        // all data save to the database
        // new products({
        //     title,
        //     price,
        //     varient,
        //     categoryId,
        //     description,
        //     review,
        //     discountPrice,
        //     tags,
        //     stock
        // })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error',error})
    }
}

module.exports={
    addProductController
}