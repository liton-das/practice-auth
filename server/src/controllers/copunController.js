const copun = require("../model/copun")
//  add copun controller 
const addCopunController=async(req,res)=>{
    try {
        const {copunName,discountPrice}=req.body
        const existCopun = await copun.findOne({copunName})
        if(existCopun){
            return res.status(400).json({message:`${copunName} Already created`})
        }
        await new copun({
            copunName,
            discountPrice
        }).save()
        return res.status(201).json({message:'Copun created success'})
    } catch (error) {
        return res.status(500).json({message:'Internal server error',error})
    }
} 
// update copun controller
const updateCopunController=async(req,res)=>{
    try {
        const {copunId,copunName,discountPrice}=req.body
        const existCopun = await copun.findOne({_id:copunId})
        if(copunName){
            existCopun.copunName=copunName
        }
        if(discountPrice){
            existCopun.discountPrice = discountPrice
        }
        await existCopun.save()
        return res.status(200).json({message:'Copun updated succcessfully!'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error',error})
    }
}
module.exports={
    addCopunController,
    updateCopunController
}