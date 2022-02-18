
const mongoose=require('mongoose')

const document=new mongoose.Schema({

    
    email:{
        type:String,
        required:true
    },
    isvalid:{
        type:Boolean,
        required:true
    },
    uniqueString:{
        type:String,
        required:true
    }

})

const register=mongoose.model('registration',document)

module.exports=register