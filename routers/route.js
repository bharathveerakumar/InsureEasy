const express=require('express');
const app=express();
const conUser=require('../controller/userControl.js');
const conAdmin=require('../controller/adminControl.js');
const session=require('express-session');
const multer=require('multer');
const validator=require('../validation/valid.js');
const conPolicy=require('../controller/policyControl.js');
const mailer=require('../controller/mailer.js');


// Port Number
app.listen(5000, ()=>{
    console.log('listening');
})


// Middlewares
app.use(express.static('views/static'));
app.set('views', 'views/layouts');
app.set('view engine', 'ejs');
app.use(session({
    secret:'123',
    resave:false,
    saveUninitialized:true
}));
app.use(multer().single('logo'));
app.use(validator);
app.use((req, res, next)=>{
    mailer.send(), next();
})


// request from client
app.get('/', conUser.message);
app.get('/insurances', conUser.insure);
app.get('/login', conUser.login);
app.get('/register', conUser.register);
app.post('/login', conUser.postLogin);
app.get('/admin', conAdmin.admin);
app.post('/vnum', conPolicy.policyType);
app.post('/otp', conAdmin.otp);
app.post('/admin', conAdmin.adminPolicy);
app.get('/policylist', conAdmin.policyList);
app.get('/buy', conUser.buy);
app.get('/remove', conAdmin.removeId);
app.get('/current', conAdmin.current);
app.get('/userprofile', conUser.profile);
app.get('/logout', conUser.logout);

