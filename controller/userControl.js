const modUser=require('../model/userHandler.js');
const polUser=require('../model/policyHandler.js');
const url=require('url');



exports.message = (req, res)=>{
    if(!req.session.name) req.session.name='login', req.session.profile='register';
    res.render('index', {sess:req.session});
}

exports.insure=(req, res)=>{
    let params=url.parse(req.url, true);
    if(req.session.name!='login')  req.session.vtype=params.query.type, res.render('vnum');
    else res.render('register', { message:'' });
}

exports.register=(req, res)=>{
    res.render('register', { message:'' });
}

exports.login=(req, res)=>{
    res.render('login', { msg:'' });
}

exports.postLogin=(req, res)=>{
    modUser.postLogin(req, res, (err, rows)=>{
        if(rows.length){
            if(rows[0].password==req.body.password){
                req.session.name=rows[0].name, req.session.profile='userprofile', req.session.phone=rows[0].phone;
                res.render('index', { sess:req.session });
            }
            else res.render('login', { msg : 'Password are not Correct' });
        }
        else res.render('login', { msg : 'Phone number Doesn\'t Exists' });
    }); 
}

exports.buy=(req, res)=>{
    polUser.currpolicy(req, res);
    res.render('index', { sess:req.session });
}

exports.profile=(req, res)=>{
    polUser.expire(req, res, (err, rows)=>{
        res.render('userprofile', { rows:rows, sess:req.session });
    });
}

exports.logout=(req, res)=>{
    req.session.name='login', req.session.profile='register';
    res.render('index', { sess:req.session });
}



