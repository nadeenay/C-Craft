const router=require('express').Router();
const {ensureauthenticated}=require('../config/auth');
const User=require('../models/User');
router.get('/',(req,res)=>{
    res.render('EmbeddedSystem',{
        title: "EmbeddedSystem",
        css: "EmbeddedSystem"
    });
});
  router.get('/ViewMaterial',ensureauthenticated,(req,res)=>{
    res.render('EmbeddedSystem',{
        title: "EmbeddedSystem",
        css: "EmbeddedSystem"
    });
  });
module.exports=router;