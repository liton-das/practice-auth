const uploadCloudinary = require("../config/cloudinary")
const { skuGenerator, slugGenerator } = require("../helpers/skuGenerator")
const products = require("../model/products")
const cloudinary = require('cloudinary').v2
const addProductController = async(req,res)=>{
    try {
        const {title,price,varient,categoryId,description,review,discountPrice,tags,stock}=req.body
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
            description,
            review,
            discountPrice,
            tags,
            stock
        } = req.body
        const existProduct = await products.findOne({_id:productId})
        if(!existProduct) return res.status(400).json({message:'Exist product not found!'})
        // update thumbnail image file---------------------
        const thumbPath = req.files.thumbnail[0].path
        const imgId = existProduct.thumbnail.split('/')[7].split('.')[0]
        let thumbnail;
        if(imgId){
            await cloudinary.uploader.destroy(imgId)
        }else{
            thumbnail = await uploadCloudinary(thumbPath)
        }
        
        // return console.log(thumbnail)
        if(title)existProduct.title=title
        if(thumbnail)existProduct.thumbnail=thumbnail
        if(price)existProduct.price=price
        if(varient) existProduct.varient=varient
        if(description)existProduct.description=description
        if(review)existProduct.review=review
        if(discountPrice)existProduct.discountPrice=discountPrice
        if(tags)existProduct.tags=tags
        if(stock)existProduct.stock=stock
        
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
// dashboard controller 
const dashboardController=async(req,res)=>{
    try {
        const {filterProduct}=req.body
        const filterBy = {}
        const sortBy ={}
        const {limit,page,minPrice,maxPrice,sortByPrice}=req.query // get page limit and page, page-skip by query
        const limitpage = limit || 6 // set the page limit dynamic and by default 6
        const pageSkip = limitpage * (page - 1) // skip per page for pagination 
        // return console.log({minPrice,maxPrice})
        if(minPrice && maxPrice) filterBy.discountPrice = {$gte:minPrice, $lte:maxPrice} // filter by Product discount Price by max and min price 
        if(filterProduct != 'all') filterBy.categoryId=filterProduct // filter by category Id 
        if(sortByPrice == 'lowToHigh') {sortBy.discountPrice = 1}
        if(sortByPrice == 'highToLow') {sortBy.discountPrice = -1}
        console.log(filterBy)
        const product=await products.find(filterBy).limit(limitpage).skip(pageSkip).sort(sortBy)

        // console.log(product)

        console.log(filterBy)
        return res.status(200).send({product,limit:limitpage,skip:pageSkip,totalProducts:product.length})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error!'})
    }
}
// public dashboard Controller 
const publicDashboardController =async(req,res)=>{
    try {
        const {filterProduct}=req.body
        const filterBy = {adminApproval:'approved'}
        const sortBy ={}
        const {limit,page,minPrice,maxPrice,sortByPrice}=req.query // get page limit and page, page-skip by query
        const limitpage = limit || 6 // set the page limit dynamic and by default 6
        const pageSkip = limitpage * (page - 1) // skip per page for pagination 
        // return console.log({minPrice,maxPrice})
        if(minPrice && maxPrice) filterBy.discountPrice = {$gte:minPrice, $lte:maxPrice} // filter by Product discount Price by max and min price 
        if(filterProduct != 'all') filterBy.categoryId=filterProduct // filter by category Id 
        if(sortByPrice == 'lowToHigh') {sortBy.discountPrice = 1}
        if(sortByPrice == 'highToLow') {sortBy.discountPrice = -1}
        console.log(filterBy)
        const product=await products.find(filterBy).limit(limitpage).skip(pageSkip).sort(sortBy)

        // console.log(product)

        console.log(filterBy)
        return res.status(200).send({product,limit:limitpage,skip:pageSkip,totalProducts:product.length})
    } catch (error) {
        return res.status(500).json({message:'Internal server error',error})
    }
}
module.exports={
    addProductController,
    updateAdminApprovalStatus,
    deleteProductController,
    updateProduct,
    dashboardController,
    publicDashboardController
}