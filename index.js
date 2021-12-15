const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')


const app = express()

app.use(cors())
app.use(express.urlencoded({extended:true}))
dotenv.config()



mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true, useUnifiedTopology: true  
},err => {
    if (err) {
        console.error(err)
    }else {
        console.log("Connect to mongodb")
    }
})

app.listen(3030,err =>{
    if (err){
        console.error(err)
    }
    else{
        console.log(3030 + " listening..")
    }
})