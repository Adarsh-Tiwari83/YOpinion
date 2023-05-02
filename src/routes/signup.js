const express=require('express');
const nodemailer=require('nodemailer');
const User=require('./../models/user');
const session=require('express-session');
const sendEmail=require('./../controllers/sendEmail.js');
const emailotprouter=require('./emailOTP.js');
const router=express.Router();

router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.post('/signup',(req,res)=>{
    User.findOne({email:req.body.email})
    .then((user)=>{
        if(user) console.log("register to hai phle se q dimaag khrab kr rha h");
        else{
            if(req.body.password===req.body.cpassword){
                let sentOTP=Math.floor(9000*Math.random()+1000);
                console.log('sent otp :'+sentOTP);
                sendEmail(req.body.email,sentOTP);
                // console.log(req.session);
                req.session.message={
                    user:req.body,
                    sentOTP: sentOTP
                }
                res.redirect('/emailOTP');
            }
            else console.log("password do baar v same nhi likh paa rhe kya krega re tu");
        }
    }).catch((err)=>{
        console.log(err);
    });
})

module.exports=router;