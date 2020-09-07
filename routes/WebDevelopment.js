const router=require('express').Router();
const {ensureauthenticated}=require('../config/auth');
router.get('/',(req,res)=>{
    res.render('WebDevelopment',{
        title: "Web Development",
        css: "WebDevelopment"
    });
});
router.get('/ViewMaterial',ensureauthenticated,(req,res)=>{
    res.render('WebDevelopment',{
        title: "Web Development",
        css: "WebDevelopment"
    });
});
module.exports=router;