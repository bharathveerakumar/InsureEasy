const model=require('./userHandler.js');
const url=require('url');


// Policy Data insertion
exports.pinsert=(req, res)=>{
    let photo=req.file.buffer.toString('base64');
    model.con.query("INSERT INTO policy_details(cname, logo, validity, vtype, ptype, price) VALUES('"+(req.body.cname).toUpperCase()+"', '"+photo+"', '"+req.body.validity+"', '"+req.body.vtype+"', '"+req.body.ptype+"', '"+req.body.price+"')")
}

// providing policy details for admin's site
exports.pdetails=(req, res, callBack)=>{
    model.con.query("SELECT * FROM policy_details", (err, rows)=>{
        callBack(err, rows);
    });
}

// removing the policy when admin requested
exports.pRemove=(req, res)=>{
    let ur=url.parse(req.url, true);
    model.con.query("DELETE FROM policy_details WHERE policy_id='"+ur.query.id+"'")
}

// providing details for admin page current policy
exports.curr=(req, res, callBack)=>{
    model.con.query("SELECT user.name, current_policy.vnum, current_policy.expire FROM user JOIN current_policy ON user.phone=current_policy.phone", (err, rows)=>{
            callBack(err, rows);
    });
}