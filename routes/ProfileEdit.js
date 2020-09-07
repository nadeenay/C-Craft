const router=require('express').Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const {ensureauthenticated}=require('../config/auth');
const multer = require("multer");
const path =require('path');
router.get('/',ensureauthenticated, async (req, res) => {
    
        const user=await User.findById(req.user._id);
        res.render('ProfileEdit', {
            title: "ProfileEdit",
            css: "ProfileEdit",
            user: user
        });
});
//set storage engine (when i upload the file where will it go and what will be its name)
//in the name of the file we put Date.now So when someone upload the same file there will not be any issue
const storage=multer.diskStorage({
    destination:'./public/uploads',
    filename:(req,file,cd)=>{
        cd(null,file.fieldname +'-'+Date.now() + path.extname(file.originalname));

    }
});
//init upload
// .single if want to upload 1 file we can upload more than 1 and then we will put an array
// single take the name of the 
const upload=multer({
    storage:storage,
    // limits:{fileSize:10}//if i want to determine the size of files uploaded
    // to make that the extention and the mimtype are both true because we want to upload images only not all files
    fileFilter:(req,file,cd)=>{
        checkfiletype(file,cd);
    } 
}).single('MyImage');
// to make that the extention and the mimtype are both true because we want to upload images only not all files
function checkfiletype(file,cd){
    const filetypes=/jpeg|jpg|png|gif/;//Note :i write them in lowerCase
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=filetypes.test(file.mimetype);
    if(extname && mimetype)
    {
        return cd(null,true);
    }
    else
    {
        cd('Error: You should upload images only')
    }
}
// Post Handle-------------------------------->
// i put all the code specialy req.body inside the upload function because when the form contain input from type file body parser can't deal with this form but multer can :)
router.post('/',ensureauthenticated,
async(req,res)=>{
    upload(req,res,async(err)=>{
        if(err) {
         console.log(err);
         req.flash('error_msg','There is an Erorr happen');
         res.redirect('/ProfileEdit');   
     } else{
        try{
         console.log(req.file);
         const name=req.body.name;
        const Bio=req.body.Bio;
        const Gender=req.body.Gender;
        console.log(req.body);
        var user=await User.findById(req.user._id);
    user=await User.findByIdAndUpdate(req.user._id,{
        Name:(typeof name!='undefined')?name:user.Name,
    Bio:(typeof Bio!='undefined')?Bio:user.Bio,
    Gender:(typeof Gender!='undefined')?Gender:user.Gender, 
    image:(typeof req.file!='undefined')?req.file.filename:user.image});
    
    (await user).save();
    req.flash('success_msg','Your Profile has been Updated Successfully');
    res.render('User-Profile', {
        title: user.Name,
        css: "User-Profile",
        user: user
    });
}catch(err){console.log(err)};}

     });});
module.exports = router;