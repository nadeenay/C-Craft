const router=require('express').Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
router.get('/',(req,res)=>{
    try{
    res.render('RegisterationPage',{
        title: "Registeration Page",
        css: "RegisterationPage"
    });
}
catch(err){console.log(err)};
});
router.post('/', [
    body('name', ' name is missing').notEmpty(),
    body('name', ' name should be at least 4 characters long').isLength({ min: 4 }),
    body('name', ' name should not be more than 100 characters long').isLength({ max: 100 }),
    body('Email', 'email is missing').notEmpty(),
    body('Email', 'Please enter a valid email').isEmail(),
    body('Password', 'password is missing').notEmpty(),
    body('Password', 'password should be at least 7 characters long').isLength({ min: 7 }),
    body('Password', 'password should not be more than 200 characters long').isLength({ max: 200 }),
    body('ConfirmPassword', 'confirm password is missing').notEmpty(),
    body('ConfirmPassword', 'Passwords are not equal').not().equals('password')
  ], async (req, res) => {
    const Name=req.body.name;
    const Email=req.body.Email; 
    const Password=req.body.Password;
    const ConfirmPassword=req.body.ConfirmPassword;
    const Gender=req.body.Gender;
    const errors = validationResult(req).errors;
    
    if(errors.length)
    {
       return res.render('RegisterationPage',{
        errors:errors,
        title: "Registeration Page",
        css: "RegisterationPage",
        Name:Name,
        Email :Email,
        Gender:Gender
       }); 
    };
    try{
        let user=await User.findOne({Name:Name});
        if(user){
            req.flash('error_msg','There is an user with this name already');
            return res.redirect('/RegisterationPage');
        }
        user=await User.findOne({Email:Email});
        if(user){
            req.flash('error_msg','There is an user with this Email already');
            return res.redirect('/RegisterationPage');
        }
        user=await User.findOne({Password:Password});
        if(user){
            req.flash('error_msg','There is an user with this Password already');
            return res.redirect('/RegisterationPage');
        }
         user=new User({
            Name:Name,
            Email:Email,
            Password:Password,
            ConfirmPass:ConfirmPassword,
            Gender:Gender
        });
        // to make the password in the data base hashed which is more secure
        const salt = await bcrypt.genSalt();
        const hashedPassword1 = await bcrypt.hash(user.Password, salt);
        const hashedPassword2 = await bcrypt.hash(user.ConfirmPass, salt);
        user.Password = hashedPassword1;
        user.ConfirmPass=hashedPassword2;
        // to save any different we make in the data base
        user = await user.save();
        req.flash('success_msg', 'You registered successfully');
        console.log(`the user created is ${user}`);
        res.redirect('/login');
    }catch(err){
    
        console.log(err);
    }
  });
  module.exports=router;