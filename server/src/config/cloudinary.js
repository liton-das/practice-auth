const cloudinary = require('cloudinary').v2
const fs = require('fs')
// Configuration
    cloudinary.config({ 
        cloud_name: 'dwjtuk5wr', 
        api_key: '596796834932469', 
        api_secret: 'w3rPiEZ1uAY5ZNJTAQJh8-A80sg' // Click 'View API Keys' above to copy your API secret
    });
const uploadCloudinary=async(filePath)=>{
    try {
        if(!filePath) return null
        const uploadResult = await cloudinary.uploader.upload(filePath,{
            public_id:Date.now()
        })
        fs.unlinkSync(filePath)
        return uploadResult.secure_url
    } catch (error) {
        console.log(error)
    }
    return upload
}
module.exports = uploadCloudinary