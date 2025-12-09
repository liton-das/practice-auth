const cart = require("../model/cart")
const products = require("../model/products")

// add to cart 
const addToCartProdut=async(req,res)=>{
    try {
        const {creatorId,cartItem}=req.body // get cart information 
        const existProduct = await cart.findOne({creatorId})
        if(existProduct){
            const cartProduct = existProduct.cartItem.map((item)=>{
                console.log(item)
                const filterProduct = cartItem.find((fp)=>fp.productId == item.productId)
                if(filterProduct){
                    item.qty += 1
                    item.varients.push(cartItem[0].varients[0])
                     res.status(200).json({message:'Product qty updated'})
                }else {
                    cartItem.map((item)=>{
                        existProduct.cartItem.push(item)
                    })
                    res.status(201).json({message:'Product added'})
                }
            })
          return await existProduct.save()
        }
        await new cart({
            creatorId,
            cartItem
        }).save()
        return res.status(201).json({message:'Cart added'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error!',error})
    }
}
// delete cart controller 
const deleteCartController =async(req,res)=>{
    try {
        const {creatorId,deleteId}=req.body
        const existProduct = await cart.findOne({creatorId})
        if(!existProduct) return res.status(404).json({message:'Cart is not found!'})
        if(existProduct._id == deleteId){
            await cart.findByIdAndDelete(deleteId)
            return res.status(200).json({message:'All cart deleted'})
        }else{
           let deleted = await cart.updateOne({$pull:{varients:{_id:deleteId}}})
        //    if(delete) return res.status(200)
            console.log(deleted)
            return res.status(200).json({message:'Cart deleted'})
        }
    } catch (error) {
        return res.status(500).json({message:'Internal server error',error})
    }
}
// get cart controller 
const getCartController=async(req,res)=>{
    try {
        const {userId}=req.body
        const existCart=await cart.find({creatorId:userId}).populate({path:'varients.productId',select:'title thumbnail discountPrice price'})
        return res.send(existCart)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error',error})
    }
}

module.exports={
    addToCartProdut,
    deleteCartController,
    getCartController
}