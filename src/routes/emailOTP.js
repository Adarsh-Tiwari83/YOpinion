const mongoose=require('mongoose');
const express=require('express');
const session=require('express-session');
const User=require('./../models/user');
const router=express.Router();

router.get('/emailOTP',(req,res)=>{
    // console.log(req.session);
    req.session.message=req.session.message;
    res.render('emailOTP');
});

router.post('/emailOTP',(req,res)=>{
    let enteredOTP=parseInt(req.body.OTP);
    let sentOTP=req.session.message.sentOTP;
    if(enteredOTP==sentOTP){
        let user=req.session.message.user;
        let newuser=new User(user);

        newuser.save();
        res.send('user verified and account created');
    }
    else res.send('otp incorrect');
})

module.exports=router;