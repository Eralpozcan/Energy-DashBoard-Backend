const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    surname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type: String,
        enum: {
            values: ['admin',  'editor', 'viewer','user'],
            message: '{VALUE} is not supported'
        },
        default: 'user'
    }
})

module.exports = mongoose.model('User',UserSchema)