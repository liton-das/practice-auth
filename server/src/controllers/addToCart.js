const cart = require("../model/cart")
const products = require("../model/products")

// add to cart 
const addToCartProdut=async(req,res)=>{
    try {
        const {creatorId,productId,varients}=req.body
        const existProduct = await cart.findOne({productId,creatorId})
        const [varient]=varients
        // return console.log(varient.varient)
        if(existProduct != null && existProduct != ''){
            if(existProduct.varients.find((item)=>item.varient == varient.varient)){
           existProduct.qty += 1
           await existProduct.save()
           return res.status(200).json({message:'Product quantity updated'})
        }
        if(existProduct.varients.find((item)=>item.varient !== varient.varient)){
            existProduct.varients.push(varient)
            existProduct.qty += 1
            await existProduct.save()
            return res.status(200).json({message:'New varient added'})
        }
        }
        await new cart({
                creatorId,
                productId,
                varients
            }).save()
        return res.status(201).json({message:'Cart Added'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error!',error})
    }
}

module.exports={
    addToCartProdut
}