const express=require('express');
const app=express();
const {check, validationResult}=require('express-validator');
const modUser=require('../model/userHandler.js');


app.use(express.static('views/static'));
app.set('views', 'views/layouts');
app.set('view engine', 'ejs');


app.post('/register', 

    check('phone').isMobilePhone().withMessage('Not a mobile number'),

    check('cpassword').custom((value, {req})=>{
        if(value!=req.body.password) return false;
        return true;
    }).withMessage('Password Not Match'),

    check('password').isLength({min:6}).withMessage('Required Minimum of length 6 for Password'),

    (req, res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            res.render('register', { message:errors.array() });
        }
        else{
            modUser.checkUserRegister(req, res, (err, rows)=>{
                if(rows.length){
                    res.render('register', { message : [{msg:'Number already exists, Please Login'}] })
                }
                else{
                    req.session.name=req.body.name, req.session.profile='userprofile', req.session.phone=req.body.phone;
                    res.render('index', { sess:req.session }), modUser.registerUser(req, res);
                }
            });
        }
    } 
); 

module.exports=app;
