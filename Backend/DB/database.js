const moongose=require('mongoose');
const DB="mongodb+srv://zain:zain@cluster0.ktdzb.mongodb.net/myFirstDatabase?retryWrites=true"

moongose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MongoDb connected sucessfully")
})
.catch((err)=>{
    console.log(err);
})