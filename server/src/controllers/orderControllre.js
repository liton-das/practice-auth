const cart = require("../model/cart")

const orderController = async(req,res)=>{
    return console.log(req.body)
    try {
        const {name,email,phone,district,comment,copun,cartId}=req.body
        if(!name || !email || !phone || !district) return res.status(401).json({message:'name,email,phone and district fields is required!'})
        let cartData=0
        if(cartId){
            cartData = await cart.findOne(cartId)
        }
        console.log(cartData)
        return res.status(cartData)


    } catch (error) {
        return res.status(500).json({message:'Internal server error',error})
    }
}
module.exports={
    orderController
}