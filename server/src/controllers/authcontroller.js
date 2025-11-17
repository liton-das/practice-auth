const { passwordRegex, emailRegex } = require("../helpers/regex");
const bcrypt = require('bcrypt');
const sendMail = require("../helpers/sendMail");
const auth = require("../model/auth");
const mailTemplate = require("../helpers/mailTemplate");
const otpGenerator = require("../helpers/otpGenerator");
const otpExpireTimeGenerator = require("../helpers/otpExpireGenerator");
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const jwt = require ('jsonwebtoken')
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
// verify otp controller 
const verifyOtpController=async(req,res)=>{
  try {
    const {otp} = req.body
    if(!otp){return res.status(401).json({message:'Otp is required!'})}
    const existOtp = await auth.findOne({otp})
    if(!existOtp){ return res.status(401).json({message:'Your otp not verified!'})}
    const expireOtpTime = new Date(Date.now()) 
    if(existOtp.otpExpireTime < expireOtpTime){
      return res.status(401).json({message:'Your otp verification time expired!'})
    }
    existOtp.otp = null,
    existOtp.otpExpireTime = null
    existOtp.isVerify= true
    await existOtp.save()
    return res.status(200).json({message:'Otp verified success'},existOtp)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:'Internal server error',error})
  }
}

// resend otp controller
const resendOtpController = async(req,res)=>{
  try {
    const {email} = req.body
    if(!email) return res.status(404).json({message:'This email has no account!'})
    const existUser = await auth.findOne({email})
  if(!existUser){return res.status(401).json({message:'Please register first to get otp!'})}
  const otpGenerate = otpGenerator()
  const otpExpire = otpExpireTimeGenerator()
  existUser.otp = otpGenerate,
  existUser.otpExpireTime = otpExpire
  sendMail(email,'Resend your otp',mailTemplate(existUser.userName,otpGenerate))
  await existUser.save()
  return res.status(200).json({message:'Otp send success'})
} catch (error) {
    console.log(error)
    return res.status(500).json({message:'Internal server error',error})
  }
}
// login controller 
const loginController =async(req,res)=>{
  try {
    const {email, password} = req.body
    
    if(!email) return res.status(404).json({message:'Email field is required!'})
      if(!emailRegex.test(email)) return res.status(401).json({message:'Invalid creadintial!'})
      if(!passwordRegex.test(password)) return res.status(401).json({message:'Invalid creadintial!'})
      const user = await auth.findOne({email})
      if(!user) return res.status(401).json({message:'user not found'})
      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch) return res.status(404).json({message:'Invalid creadintial!'})
      const token = jwt.sign({
        email:user.email,
        role:user.userRole
    },process.env.SECRET_KEY,{expiresIn:'1h'})
    const userInfo={
      userName:user.userName,
      userEmail:user.email
    }
    return res.status(200).json({message:'Login successfully',userInfo,accessToken:token})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:'Internal server error',error})
  }
}
// update4 profile controller 
// Configuration
    cloudinary.config({ 
        cloud_name: 'dwjtuk5wr', 
        api_key: '596796834932469', 
        api_secret: 'w3rPiEZ1uAY5ZNJTAQJh8-A80sg' // Click 'View API Keys' above to copy your API secret
    });
const updateProfileController = async(req,res)=>{
  try {
    const filePath = req.file.path
    const {userName,email,phone,password,address} = req.body
  const existUser = await auth.findOne({ email})
  if(!existUser){
    return res.status(401).json({message:'Invalid user email!'})
  }
  if(userName){
    existUser.userName=userName
  }
  if(email){
    existUser.email = email
  }
  if(phone){
    existUser.phone = phone
  }
  if(password){
    existUser.password = password
  }
  if(address){
    existUser.address = address
  }
  
  if(filePath){
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
          filePath ,
           {
               public_id: Date.now(),
           }
       )
      
    existUser.avatar = uploadResult.url
    await existUser.save()
    fs.unlinkSync(filePath,(e)=>{
      if(e){
        console.log(e)
      }
    })
  }
    return res.status(200).json({message:'Profile updated successfully',existUser})
    } catch (error) {
    
    return res.status(500).json({message:'Internal server error!'})
  }
}
module.exports = {
    registerController,
    verifyOtpController,
    resendOtpController,
    loginController,
    updateProfileController
}