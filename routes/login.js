
const router=require('express').Router();
const expresssession=require('express-session');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const passport=require('passport');
const User = require('../models/User');
router.get('/',(req,res)=>{
    res.render('login',{
        title: "login Page",
        css: "login"
    });
});
router.post('/',[
    body('Email', 'email is missing').notEmpty(),
    body('Email', 'Please enter a valid email').isEmail(),
    body('Password', 'password is missing').notEmpty()
  ],async(req,res,next)=>{
    const errors = validationResult(req).errors;
    if(errors.length)
    {
       return res.render('login',{
           errors:errors,
        title: "login Page",
        css: "login"
    });
    };
    passport.authenticate('local', { successRedirect: '/home',
                                   failureRedirect: '/login',
                                   failureFlash: true,
                                   successFlash:true })(req,res,next)
                                    req.flash('success_msg', 'You Loged In successfully Welcome !');
                                   
                                   
    
});
module.exports=router;