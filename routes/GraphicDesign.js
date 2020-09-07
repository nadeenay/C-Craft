const router=require('express').Router();
const {ensureauthenticated}=require('../config/auth');
router.get('/',(req,res)=>{
    res.render('GraphicDesign',{
        title: "Graphic Design",
        css: "GraphicDesign"
    });
});
router.get('/ViewMaterial',ensureauthenticated,(req,res)=>{
    res.render('GraphicDesign',{
        title: "Graphic Design",
        css: "GraphicDesign"
    });
});
module.exports=router;