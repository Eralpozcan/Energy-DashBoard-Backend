const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')


const db = require('./db/index')
const account = require('./routers/userRouters')

const app = express()

app.use(cors())
app.use('/account',account)
app.use(express.urlencoded({extended:true}))
dotenv.config()

app.get('/factorylist',db.dashboard.getFactoryList)
app.delete('/factorylist',db.dashboard.delFactoryList)
app.post('/factorylist',db.dashboard.createFactoryList)
app.put('/factorylist',db.dashboard.updateFactoryList)

app.get('/factorydata',db.dashboard.getFactoryData)
app.delete('/factorydata',db.dashboard.delFactoryData)
app.post('/factorydata',db.dashboard.createFactoryData)
app.put('/factorydata',db.dashboard.updateFactoryData)


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