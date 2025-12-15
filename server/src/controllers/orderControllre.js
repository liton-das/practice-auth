const otpGenerator = require("../helpers/otpGenerator")
const { emailRegex } = require("../helpers/regex")
const cart = require("../model/cart")
const copun = require("../model/copun")
const order = require("../model/order")
const orderController = async(req,res)=>{
    try {
        const {name,email,phone,district,comment,copunName,cartId}=req.body
        if(!name || !email || !phone || !district) return res.status(401).json({message:'name,email,phone and district fields is required!'})
        if(!emailRegex.test(email)) return res.status(400).json({message:'Invalid your email!'})
        // check existCopun
       let copunData=0
       if(copunName){
            copunData=await copun.findOne({copunName})
        }

        const existCartItems=await cart.findOne({_id:cartId}).populate({path:'cartItem.productId', select:'title thumbnail price varient discountPrice qty'})
        const productsPrice=existCartItems.cartItem.reduce((acc,curr)=>{
        return acc + (curr.productId.discountPrice*curr.qty)
       },0)
    // delivery Charge 
    let deliveryCharge=80
    if(district!='Dhaka') deliveryCharge = 120
    const subTotal= copunData?.discountPrice - (productsPrice+deliveryCharge)
    await new order({
        orderId:otpGenerator(),
        name,
        email,
        district,
        comment,
        productInfo:existCartItems,
        total:productsPrice,
        totalPrice:subTotal,
        copun:copunData.discountPrice
    }).save()
    return res.status(200).json({total:productsPrice,copunDiscount:copunData.discountPrice,deliveryCharge,subTotal})
    } catch (error) {
        return res.status(500).json({message:'Internal server error',error})
    }
}

// get all orders controller
const getAllOrdersController = async(req,res)=>{
    try {
        const orders = await order.find()
        if(!orders) return res.status(404).json({message:'Orders not found!'})
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({message:'Internal server error',error})
    }
}

// get all order by customer email
const getAllOrderByCustomer=async(req,res)=>{
    try {
        const {email}=req.body
        if(!emailRegex.test(email)) return res.status(401).json({message:"Please provide an valid email!"})
        const existOrders = await order.findOne({email})
        if(!existOrders) return res.status(404).json({message:'Exists order not found!'})
        return res.status(200).json(existOrders)
    } catch (error) {
        return res.status(500).json({message:'Internal server error',error})
    }
}

// delete OrderByOrderId controller 
const deleteOrderController = async(req,res)=>{
    try {
        const {orderId}=req.body
        await order.findByIdAndDelete({_id:orderId})
        return res.status(200).json({message:'Your order deleted successfully!'})
    } catch (error) {
        return res.status(500).json({message:'Internal server error!'})
    }
}
module.exports={
    orderController,
    getAllOrdersController,
    getAllOrderByCustomer,
    deleteOrderController
}