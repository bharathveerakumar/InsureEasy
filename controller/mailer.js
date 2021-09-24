const mailer=require('nodemailer');
const mod=require('../model/userHandler.js');


let transport=mailer.createTransport({
    service:'gmail',
    auth:{
        user:'coderbharath888@gmail.com',
        pass:'veerakumar'
    }
});


let resMail=(name, email)=>{
    let mailContent={
        from:'coderbharath888@gmail.com',
        to:email,
        subject:'Renew Your Policy',
        text:`Hi ${name}, Please Renew your policy Soon!!!`
    }
    transport.sendMail(mailContent);
}


let name, email;

let send=()=>{
    let date=new Date(Date.now());
    date=date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate();
    mod.con.query("SELECT phone FROM current_policy WHERE expire='"+date+"'", (err, rows)=>{
        for(var i=0;i<rows.length;i++){
            mod.con.query("SELECT name, email FROM user WHERE phone='"+rows[i].phone+"'", (err, row)=>{
                name=row[0].name, email=row[0].email;
                resMail(name, email);
            });
        }
    });
    mod.con.query("DELETE FROM current_policy WHERE expire='"+date+"'");
}


module.exports={ send }; 
