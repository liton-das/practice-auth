const  jwt = require('jsonwebtoken')

const verifyToken = async(req,res,next)=>{
    try {
        const token = req.headers.authorization
        const isVerifyToken = jwt.sign(token,process.env.SECRET_KEY)
        if(!isVerifyToken){
            return res.status(404).json({message:'Invalid token!'})
        }
        next()
    } catch (error) {
        console.log(error)
         res.status(307).redirect('http://localhost:5173/auth/login').send('Token already expired!')
    }
}
module.exports = verifyToken