const adminMailer=require('../controller/adminMailer.js');
const adminPolicy=require('../model/adminHandler.js');


exports.admin=(req, res)=>{
    let s="0123456789", otp="";
    for(var i=0;i<4;i++){
        otp+=(s[Math.floor(Math.random()*10)])
    }
    if(req.session.otp) res.render('admin');
    else{
        req.session.otp=otp;
        adminMailer.send(req, res);
        res.render('otp', { msg:'' });
    }
}

exports.otp=(req, res)=>{
    if(req.body.otp==req.session.otp) res.render('admin');
    else res.render('otp', { msg:'Wrong Entered  Your OTP' });
}

exports.adminPolicy=(req, res)=>{
    adminPolicy.pinsert(req, res);
    res.render('admin');
}

exports.policyList=(req, res)=>{
    adminPolicy.pdetails(req, res, (err, rows)=>{
        res.render('policylist', { rows:rows });
    });
}

exports.removeId=(req, res)=>{
    adminPolicy.pRemove(req, res);
    this.policyList(req, res);
}

exports.current=(req, res)=>{
    adminPolicy.curr(req, res, (err, rows)=>{
        res.render('curr_policy', { rows:rows });
    });
};
