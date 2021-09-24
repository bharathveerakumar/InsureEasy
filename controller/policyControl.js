const policy=require('../model/policyHandler.js');


exports.policyType=(req, res)=>{
    req.session.vnum=req.body.vnum;
    policy.policytype(req, res, (err,rows)=>{
        res.render('insurances', { sess:req.session, rows:rows });
    });
}