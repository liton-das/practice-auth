const express = require('express')
const cors = require('cors')
const dbConnection = require('./src/config/db')
const router = require('./src/routes/routes')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 4000
app.use(cors({
    origin:''
}))
app.use(express.json())
app.use(router)

app.listen(PORT,(e)=>{
    dbConnection()
    if(e){
        console.log(e);
    }
    console.log(`server running on this port==>${PORT}`)
})