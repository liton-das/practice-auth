const cart = require("../model/cart")
const products = require("../model/products")

// add to cart 
const addToCartProdut=async(req,res)=>{
    try {
        const {creatorId,productId,varient}=req.body
        const existProduct = await products.findOne({_id:productId})
        if (!existProduct) {
            return res.status(404).json({message:'This product not exist!'})
        }
        const cartItem = await cart.find()
    // return console.log(existProduct.varient[0].varientName)
        const cartVarient = cartItem.map((item2)=>{
                item2.varient.map(async(currentVarient)=>{
                if(item2.varient[0].varient==existProduct.varient[0].varientName){
                    let qty= Number(currentVarient.qty)
                    qty += 1
                    const data = await cart.findByIdAndUpdate(productId,{qty},{new:true})
                    return res.status(200).json({message:'updated',data})
                }
            })
            //  item2.varient[0].varient// findOut the varient : xl,m    
        })
     
        // return res.status(200).json({cartProduct})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error!',error})
    }
}

module.exports={
    addToCartProdut
}