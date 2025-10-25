const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 4000
app.use(cors({
    origin:''
}))
app.use(express.json())

app.listen(PORT,(e)=>{
    if(e){
        console.log(e);
    }
    console.log(`server running on this port==>${PORT}`)
})