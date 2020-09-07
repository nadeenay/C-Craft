
module.exports={
    ensureauthenticated:(req,res,next)=>{
        if(req.isAuthenticated())
        {
            return next();
        }
        req.flash('error_msg','Sorry You have to log in first');
        res.redirect('/login');
    }
}