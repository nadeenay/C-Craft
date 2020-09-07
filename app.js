const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const multer=require('multer');
const session =require('express-session');
const ejs=require('ejs');
const path =require('path');
const passport=require('passport');
const passport_local=require('passport-local');
const {ensureauthenticated}=require('./config/auth');
const User=require('./models/User');
const port=9090;
app.listen(port,err=>{
  if(err) console.log(err);
  console.log(`listening at port ${port}`);
})
app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','.ejs');

//MW of mongoose
mongoose.connect('mongodb://localhost/Web-Project', {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to DB');
});
//MW of body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//MW of session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));
//MW of passport-passport_local important to put it between session and connect flash
  app.use(passport.initialize());
  app.use(passport.session());
//MW of connect flash
  app.use(require('connect-flash')());
//MW of flash messages(Some local variables)
app.use((req, res, next)=>{
  //res.locals.messages = require('express-messages')(req, res);
  res.locals.success_msg=req.flash('success_msg');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error =req.flash('error');// To disply the messages in localstartgy..
  res.locals.isAuthenticated=req.isAuthenticated();//to know if the user is loged in or not ..
  next();
});
//passport config
require('./config/passport')(passport);
//route For log out
app.get('/Logout',(req,res)=>{
  req.logOut();
  req.session.destroy();// to destroy the data from the session if the user loged out
  res.redirect('/home');
});
// Enroll buttons Handle---->
app.get('/Enroll1',ensureauthenticated,async(req,res)=>{
  const user=req.user;
  user.Courses.push('Embedded System');
 (await user).save();
 res.redirect('EmbeddedSystem');
    });
app.get('/Enroll2',ensureauthenticated,async(req,res)=>{
  const user=req.user;
  user.Courses.push('MachineLearning');
 (await user).save();
  res.redirect('MachineLearning');
  });
app.get('/Enroll3',ensureauthenticated,async(req,res)=>{
  const user=req.user;
  user.Courses.push('WebDevelopment');
 (await user).save();
    res.redirect('WebDevelopment');
    });
app.get('/Enroll4',ensureauthenticated,async(req,res)=>{
  const user=req.user;
  user.Courses.push('GraphicDesign');
 (await user).save();
    res.redirect('GraphicDesign');
    });
    //View Material Handle----->

app.get('/ViewMaterial1',ensureauthenticated,async(req,res)=>{
  const user=req.user;
  if(user.Courses.includes("Embedded System"))
  {
  res.render('EmbeddedMaterials',{
    title: "EmbeddedMaterials",
    css: "EmbeddedMaterials"
});
  }
  else{
    req.flash('error','Sorry You Have To Enroll First !')
    res.redirect('/EmbeddedSystem');

  }
});
app.get('/ViewMaterial2',ensureauthenticated,async(req,res)=>{
  const user=req.user;
  if(user.Courses.includes("MachineLearning"))
  {
  res.render('MachineMaterials',{
    title: "MachineMaterials",
    css: "MachineMaterials"
    });
  }
  else{
    req.flash('error','Sorry You Have To Enroll First !')
    res.redirect('/MachineLearning');

  }
});
app.get('/ViewMaterial3',ensureauthenticated,async(req,res)=>{
  const user=req.user;
  if(user.Courses.includes('WebDevelopment'))
  {
  res.render('WebMaterials',{
    title: "WebMaterials",
    css: "WebMaterials"
});
  }
  else{
    req.flash('error','Sorry You Have To Enroll First !')
    res.redirect('/WebDevelopment');

  }
});
app.get('/ViewMaterial4',ensureauthenticated,async(req,res)=>{
  const user=req.user;
  if(user.Courses.includes('GraphicDesign'))
  {
  res.render('GraphicMaterials',{
    title: "GraphicMaterials",
    css: "GraphicMaterials"
});
  }
  else{
    req.flash('error','Sorry You Have To Enroll First !')
    res.redirect('/GraphicDesign');

  }
});
//MW of routes
app.use('/RegisterationPage',require('./routes/RegisterationPage'));
app.use('/login',require('./routes/login'));
app.use('/contactUs',require('./routes/contactUs'));
app.use('/home',require('./routes/home'));
app.use('/',require('./routes/home'));
app.use('/EmbeddedSystem',require('./routes/EmbeddedSystem'));
app.use('/MachineLearning',require('./routes/MachineLearning'));
app.use('/WebDevelopment',require('./routes/WebDevelopment'));
app.use('/GraphicDesign',require('./routes/GraphicDesign'));
app.use('/User-Profile',require('./routes/User-Profile'));
app.use('/ProfileEdit',require('./routes/ProfileEdit'));



