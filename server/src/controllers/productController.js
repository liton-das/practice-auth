const { skuGenerator, slugGenerator } = require("../helpers/skuGenerator")

const addProductController = async(req,res)=>{
    try {
        const {title,price,varient,categoryId,description,review,discountPrice,tags,stock}=req.body
        // console.log(title,price,varient,categoryId,description,review,discountPrice,tags,stock)
        const sku = skuGenerator(title)
        const slug = slugGenerator(title)
        // upload images
        console.log(req.files,'in req')
        const images = req.files.subImages?.map(item=>{
            console.log(`item in map ${item.path}`)
            return item
        })
        console.log(images.path)
    } catch (error) {
        return res.status(500).json({message:'Internal server error',error})
    }
}

module.exports={
    addProductController
}