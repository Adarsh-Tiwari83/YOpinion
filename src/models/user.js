const mongoose=require('mongoose');
require('dotenv').config();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
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
        type:Date
    }
});
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        unique:true,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    opinions:{
        type:[opinionSchema]
    }
});

userSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},"MYNAMEISADARSHTIWARIFROMMNNITALLAHABAD");
        this.tokens=this.tokens.concat({token:token}); 
        const user=await jwt.verify(token,process.env.SECRET_KEY);
        console.log(user);
        await this.save();
        return token;
    } catch(err){
        console.log(err);
    }
}

userSchema.pre('save',async function(next){
    // console.log("hi");
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
})



const User=new mongoose.model('User',userSchema);
module.exports=User;