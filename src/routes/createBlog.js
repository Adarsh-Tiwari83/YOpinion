const express=require('express');

const Opinion=require('./../models/opinion');
const User=require('./../models/user');
const router=express.Router();

router.get('/:id/newBlog',async(req,res)=>{
    const user=await User.findById(req.params.id);
    res.render('createBlog',{user:user});
});

router.post('/:id/newBlog',async(req,res)=>{
    // console.log(req.params.id);
    const user=await User.findById(req.params.id);
    let newOpinion=new Opinion({
        name:user.name,
        title:req.body.title,
        content:req.body.content,
        createdAt:new Date()
    });
    newOpinion.save();
    user.opinions.push(newOpinion);
    user.save();
    res.redirect(`/${req.params.id}`);
})

module.exports=router