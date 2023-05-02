const express=require('express');
const mongoose=require('mongoose');
const User=require('./../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const router=express.Router();

router.get('/login',(req,res)=>{
    // res.cookie('jwtoken','adarsh');
    res.render('login');
});

router.post('/login',async(req,res)=>{

        try{
            let email=req.body.email;
            const thatuser=await User.findOne({email:email});
            const success=await bcrypt.compare(req.body.password,thatuser.password);
                if(thatuser){
                    // console.log(thatuser);
                    if(success){
                        const token=await thatuser.generateAuthToken();
                        // console.log(token); 
                        res.cookie('jwtoken',token,{
                            expires:new Date(Date.now()+900000), //remembers for 15 minutes(in mili sec)
                            httpOnly:true //so that it runs on http not only on https
                        });
                        req.session.message={
                            user:thatuser
                        };
                        console.log(thatuser._id);
                        res.redirect(`/${thatuser._id}`);
                    }
                    else{
                        res.send("<h1>password v nhi yaad tereko,kya yaar</h1>");
                    }
                }
                else{
                    console.log("phle account to bnao murkh insaan");
                }
        }
        catch(err){
            console.log(err);
        }
});

module.exports=router;