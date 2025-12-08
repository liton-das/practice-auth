const cart = require("../model/cart")
const products = require("../model/products")

// add to cart 
const addToCartProdut=async(req,res)=>{
    try {
        const {creatorId,productId,varients}=req.body // get cart information 
        const existProduct = await cart.findOne({productId,creatorId}) // find exist product from db
        const [varient]=varients // distructure 
        if(existProduct != null && existProduct != ''){ // check validation no product in db then added a new cart
            if(existProduct.varients.find((item)=>item.varient == varient.varient)){ // if same variant have in db then just increase the quantity
            existProduct.qty += 1
           await existProduct.save()
           return res.status(200).json({message:'Product quantity updated'})
        }
        if(existProduct.varients.find((item)=>item.varient !== varient.varient)){ // if same product but not same variant the added new variant 
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
            }).save() // new cart added in db
        return res.status(201).json({message:'Cart Added'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error!',error})
    }
}

module.exports={
    addToCartProdut
}