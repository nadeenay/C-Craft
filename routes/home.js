const router=require('express').Router();

router.get('/',(req,res)=>{
    res.render('home',{
        title: "HomePage",
        css: "home"
    });
});
module.exports=router;