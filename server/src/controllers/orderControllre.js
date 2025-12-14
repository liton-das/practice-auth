const cart = require("../model/cart")
const copun = require("../model/copun")
const orderController = async(req,res)=>{
    try {
        const {name,email,phone,district,comment,copuns,cartId}=req.body
        if(!name || !email || !phone || !district) return res.status(401).json({message:'name,email,phone and district fields is required!'})
        const existCartItems=await cart.findOne({_id:cartId}).populate({path:'cartItem.productId', select:'title thumbnail price varient discountPrice qty'})
       const products=existCartItems.cartItem.reduce((acc,curr)=>{
        const total= acc + curr.productId.price
        acc.price = curr.productId.price
        acc.discountPrice = curr.productId.discountPrice
        acc.varient = curr.productId.varient
        acc.qty = curr.qty
        return acc
       },{})
       // extract all countable data from cratItem
       const {price,discountPrice,varient,qty}=products
    //    check existCopun
       let copunData={}
       if(copuns){
            copunData=await copun.findOne({copunName:copuns})
       }
    //    delivery Charge 
    let deliveryCharge=80
    if(district!='Dhaka') deliveryCharge = 120
    // current price 
    const currPrice = price + (copunData.discountPrice*qty)
       
        return res.json(products)
    } catch (error) {
        return res.status(500).json({message:'Internal server error',error})
    }
}
module.exports={
    orderController
}