const  jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    try {
        const token = req.headers.authorization
        const isVerifyToken = jwt.verify(token,process.env.SECRET_KEY)
        console.log(token,'token found')
        if(!isVerifyToken){
            return res.status(307).json({message:'Invalid token!'})
        }
        req.user = token
        next()
    } catch (error) {
        console.log(error)
         res.status(400).send('Token already expired!')
    }
}
module.exports = verifyToken