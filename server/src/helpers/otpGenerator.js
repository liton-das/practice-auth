const otpGenerator=()=>{
    const digits = '0123456789';
  let otp = '';
 let length = 6
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}
module.exports = otpGenerator