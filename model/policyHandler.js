const conv=require('../model/userHandler.js');
const url=require('url');


// Taking details according to the type of vehicle and policy
exports.policytype=(req, res, callBack)=>{
    conv.con.query("SELECT * FROM policy_details WHERE vtype='"+req.session.vtype+"'", (err, rows)=>{
        callBack(err, rows);
    });
}

// Adding to current policy holders
exports.currpolicy=(req, res)=>{
    let ur=url.parse(req.url, true), val, expire=new Date(), date;
    conv.con.query("SELECT validity FROM policy_details WHERE policy_id='"+ur.query.id+"'", (err, rows)=>{
        rows[0].validity=='6'?val=182:val=365;
        expire.setDate(expire.getDate()+val);
        date=expire.getFullYear()+'/'+expire.getMonth()+'/'+expire.getDate();
        conv.con.query("INSERT INTO current_policy VALUES('"+ur.query.id+"', '"+date+"', '"+req.session.phone+"', '"+req.session.vnum+"')")
    });
}

// providing data's for user profile
exports.expire=(req, res, callBack)=>{
    conv.con.query("SELECT * FROM current_policy WHERE phone='"+req.session.phone+"'", (err, rows)=>{
        callBack(err, rows);
    });
}