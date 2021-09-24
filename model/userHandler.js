const sql=require('mysql');


// Database connection
let con=sql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    dateStrings:true,
    database:'Insurance_management_system'
});
con.connect((err, results)=>{
    if(err) console.log(err);
    else console.log('database connected Successfully');
});


// User Insertion of Data
let registerUser=(req, res)=>{
    con.query("INSERT INTO user(name, phone, password, email) VALUES('"+req.body.name+"', '"+req.body.phone+"', '"+req.body.password+"', '"+req.body.email+"')");
}


// User Register Checking
let checkUserRegister=(req, res, callBack)=>{
    con.query("SELECT phone FROM user WHERE phone='"+req.body.phone+"'", function(err, rows){
        callBack(err, rows);
    });
}


// User Login Check-up
let postLogin=(req, res, callBack)=>{
    con.query("SELECT password, name, phone FROM user WHERE phone='"+req.body.phone+"'", (err, rows)=>{
        callBack(err, rows);
    });
}


module.exports={
    con, registerUser, checkUserRegister, postLogin
};
