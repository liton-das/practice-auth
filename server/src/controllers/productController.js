const { skuGenerator, slugGenerator } = require("../helpers/skuGenerator")

const addProductController = async(req,res)=>{
    try {
        const {title,price,varient,categoryId,description,review,discountPrice,tags,stock}=req.body
        // console.log(title,price,varient,categoryId,description,review,discountPrice,tags,stock)
        const sku = skuGenerator(title)
        const slug = slugGenerator(title)
    } catch (error) {
        return res.status(500).json({message:'Internal server error',error})
    }
}

module.exports={
    addProductController
}