const checkRole=(roles)=>{
    return (req,res,next)=>{
        if(roles[0] == req.user.role || roles[1] == req.user.role){
           return next()
        }else{
            return res.status(401).json({message:'you are not authorized for this features'})
        }
    }
}

module.exports=checkRole