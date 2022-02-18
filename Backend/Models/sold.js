const mongoose=require("mongoose")

const document=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        products:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"products"
        }
        ]
    }
)

const sold=mongoose.model("User",document)

module.exports=sold