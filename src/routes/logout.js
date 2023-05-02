const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User=require('./../models/user');
const auth=require('./../middleware/auth');

router.get('/logout',auth,async(req,res)=>{

    // login from one device at a time
    req.user.tokens=req.user.tokens.filter((lastLogin)=>{
        return (lastLogin.token != req.token);
    });

    //logout from all devices
    // req.user.tokens=[];

    res.clearCookie('jwtoken');
    await req.user.save();
    console.log("user logged out successfully");
    res.render('login');
});

module.exports=router;