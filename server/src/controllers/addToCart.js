// add to cart 
const addToCartProdut=async(req,res)=>{
    try {
        const {creatorId,productId}=req.body
        return console.log(creatorId,productId)
        
    } catch (error) {
        return res.status(500).json({message:'Internal server error!'})
    }
}

module.exports={
    addToCartProdut
}