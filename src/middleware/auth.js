const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User=require('./../models/user');

const auth=async(req,res,next)=>{
    try{
        // console.log("hello");
        const token=req.cookies.jwtoken;
        // console.log(token);
        const verifyuser=await jwt.verify(token,process.env.SECRET_KEY);
        
        // console.log(verifyuser);
        const user=await User.findOne({_id:verifyuser._id});
        req.user=user;
        req.token=token;
        // console.log(user);
        next();
    }catch(err){
        res.status(401).send(err);
    }
}

module.exports=auth;