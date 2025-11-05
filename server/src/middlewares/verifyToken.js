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
        return res.status(307).redirect('/auth/login').send('Invalid')
    }
}
module.exports = verifyToken