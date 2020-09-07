
const mongoose =require('mongoose');
const { urlencoded } = require('body-parser');
const  Schema  = mongoose.Schema;
// var CourseSchema=new Schema({
//     name:{type:String}
// });
const UserSchema=new Schema({
    Name:{
        type:String,
        required:true
        
    },
    Email :{
        type:String,
        required:true,
        email:true
        
    },
    Password:{
        type:String,
        required:true
        
    
    },
    ConfirmPass:{
        type:String,
        required:true
       
    
    },
    Gender:{
      type:String,
      required:true
      
    },
    Bio:{
        type:String,
        default:''
        
    },
    
    Courses:{
    type:[String]
    },
    image:{
        type:String
    }
    
});
module.exports=mongoose.model('User',UserSchema);