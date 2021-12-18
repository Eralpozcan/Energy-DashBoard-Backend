const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const log = require('./middleware/log')
const auth = require('./middleware/auth')
const isAdmin =require('./middleware/isAdmin')
const isEditor = require('./middleware/isEditor')

const db = require('./db/index')
const account = require('./routers/userRouters')



const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
dotenv.config()


app.use('/account',account)


app.get('/factorylist',db.dashboard.getFactoryList)
app.delete('/factorylist',auth,isAdmin,log,db.dashboard.delFactoryList)
app.post('/factorylist',auth,isEditor,log,db.dashboard.createFactoryList)
app.put('/factorylist',auth,isEditor,log,db.dashboard.updateFactoryList)

app.get('/factorydata',db.dashboard.getFactoryData)
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

app.listen(3030,err =>{
    if (err){
        console.error(err)
    }
    else{
        console.log(3030 + " listening..")
    }
})