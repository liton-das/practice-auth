const { passwordRegex, emailRegex } = require("../helpers/regex");
const bcrypt = require('bcrypt');
const sendMail = require("../helpers/sendMail");
const auth = require("../model/auth");
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
    const hashed = await bcrypt.hash(password,10)
    sendMail(email,'hi liton')
    const user= new auth({
        userName,
        email,
        phone,
        password:hashed,
        address,
        userRole
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