const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const db = require('./db/index')
const account = require('./routers/userRouters')
const log = require('./middleware/log')
const auth = require('./middleware/auth')
const isAdmin =require('./middleware/isAdmin')
const isEditor = require('./middleware/isEditor')
const app = express()

app.use(cors())
app.use('/account',account)
app.use(express.urlencoded({extended:true}))
dotenv.config()

app.get('/factorylist',auth,db.dashboard.getFactoryList)
app.delete('/factorylist',auth,isAdmin,log,db.dashboard.delFactoryList)
app.post('/factorylist',auth,isEditor,log,db.dashboard.createFactoryList)
app.put('/factorylist',auth,isEditor,log,db.dashboard.updateFactoryList)

app.get('/factorydata',auth,db.dashboard.getFactoryData)
app.delete('/factorydata',auth,isAdmin,log,db.dashboard.delFactoryData)
app.post('/factorydata',auth,isEditor,log,db.dashboard.createFactoryData)
app.put('/factorydata',auth,isEditor,log,db.dashboard.updateFactoryData)




mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true, useUnifiedTopology: true  
},err => {
    if (err) {
        console.error(err)
    }else {
        console.log("Connect to mongodb")
    }
})

app.listen(process.env.PORT,err =>{
    if (err){
        console.error(err)
    }
    else{
        console.log(process.env.PORT + " listening..")
    }
})