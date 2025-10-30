const { passwordRegex, emailRegex } = require("../helpers/regex");
const bcrypt = require('bcrypt');
const sendMail = require("../helpers/sendMail");
const auth = require("../model/auth");
const mailTemplate = require("../helpers/mailTemplate");
const otpGenerator = require("../helpers/otpGenerator");
const otpExpireTimeGenerator = require("../helpers/otpExpireGenerator");
const registerController = async (req, res) => {
  try {
    // get user information from client
    const { userName, email, phone, password, address, userRole } = req.body;
    // check validation 
    if (!userName || !email || !phone || !password || !address) {
      return res.status(404).json({ message: "all fields is required!" });
    }
    if(!passwordRegex.test(password)){
        return res.status(401).json({message:'please provide an strong password!'})
    }
    if(password.length < 6 && password.length > 15){
        return res.status(401).json({message:'password must be between 6 to 15 characters!'})
    }
    if(!emailRegex.test(email)){
        return res.status(401).json({message:'email is Invalid!'})
    }
    const existsUser = await auth.findOne({email})
    if(existsUser){
      return res.status(401).json({message:'user email alredy exists!'})
    }
    const hashed = await bcrypt.hash(password,10)
 
    const otp =otpGenerator()
    sendMail(email,`Sub`,mailTemplate(userName,otp))
    const user= new auth({
        userName,
        email,
        phone,
        password:hashed,
        address,
        otp,
        userRole,
        otpExpireTime:otpExpireTimeGenerator()
    })
   await user.save()
   return res.status(201).json({message:'user created successfully'},user)
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
module.exports = {
    registerController
}