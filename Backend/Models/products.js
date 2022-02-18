
const mongoose=require('mongoose')

const document=new mongoose.Schema({

    
    name:{
        type:String,
        required:true
    }
})

const register=mongoose.model('products',document)

module.exports=register