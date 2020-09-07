const LocalStrategy= require('passport-local').Strategy;
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const User=require('../models/User');
module.exports=passport=>{
    try{
     passport.use(
        new LocalStrategy({usernameField:'Email',passwordField: 'Password'} ,async (username,password,done)=>{
          //usernameField /passwordField are options because i named this fields with different names..
          const user=await User.findOne({Email:username});
            if(!user){
                return done(null,false,{message:'That email is not registered'});
            }
             const Ismatch=await  bcrypt.compare(password,user.Password);
               if(!Ismatch)
               {
                  return done(null,false,{message:'Wrong Password'});
               }
  
                  return  done(null,user);
               
              }))}
            catch(err){console.log(err)};
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}