const mongoose=require('mongoose');
const opinionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    likes:{
        type:Number
    },
    dislikes:{
        type:Number
    },
    comments:{
        type:[String]
    }
});
const Opinion=new mongoose.model('Opinion',opinionSchema);
module.exports=Opinion;