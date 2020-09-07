const router=require('express').Router();
const nodmailer=require('nodemailer');
const mailGun=require('nodemailer-mailgun-transport');
const { getMaxListeners } = require('../models/User');
router.get('/',(req,res)=>{
    res.render('contactUs',{
        title: "ContactUs",
        css: "contactUs"
    });
});
router.post('/',async(req,res)=>{

  const auth={
    auth:{
        api_key:'7e42cffa5107c77e1617bbfc17f4393b-4d640632-33b659c5',
        domain:'sandboxad6747827c8e4e5fa9664b78568ad03c.mailgun.org'
    }
}

const sendMail=()=>{
    const {name ,Email,Subject,Message}=req.body
    const output=`
    <h3>contact Details</h3>
    <ul>
    <li>${name}</li>
    <li>${Email}</li>
    <li>${Subject}</li>
    </ul>
    <h3>Message</h3>
    <li>${Message}</li>`;
    const transporter=nodmailer.createTransport(mailGun(auth));
    const mailOptions={
        from:Email,
        to:'nadeenayman32@gmail.com',
        subject:`You have an Email from ${name}`,
        text:Message,
        html:output
    };
    transporter.sendMail(mailOptions,(err)=>{
        if(err)
        console.log(err);
        else
        console.log('Message Sent');
        })
}
sendMail();
    
});
module.exports=router;