const otpExpireTimeGenerator =()=>{
    let minutes=3
    const date = new Date(Date.now() + minutes * 60 *1000)
    return date
}
module.exports = otpExpireTimeGenerator