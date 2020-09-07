const router=require('express').Router();
const {ensureauthenticated}=require('../config/auth');
const mongoose=require('mongoose');
const User=require('../models/User');
router.get('/',(req,res)=>{
    res.render('MachineLearning',{
        title: "Machine Learning",
        css: "MachineLearning"
    });
});
router.get('/ViewMaterial',ensureauthenticated,(req,res)=>{
    res.render('MachineLearning',{
        title: "Machine Learning",
        css: "MachineLearning"
    });
});
module.exports=router;