const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User=require('./../models/user');
const auth=require('./../middleware/auth');


router.get('/:id',auth,async(req,res)=>{
    try{
        console.log(req.params);
        let id=req.params.id;
        const user=await User.findById(id);
        console.log(user);
        res.render('profilepage',{user:user});
    }
    catch(err){
        console.log(err);
    }
});

module.exports=router;