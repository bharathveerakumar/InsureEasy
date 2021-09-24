const mailer=require('nodemailer');

let transport=mailer.createTransport({
    service:'gmail',
    auth:{
        user:'coderbharath888@gmail.com',
        pass:'veerakumar'
    }
});

exports.send=(req, res)=>{
    let mailContent={
        from:'coderbharath888@gmail.com',
        to:'bharathveerakumar888@gmail.com',
        subject:'Admin OTP',
        text:req.session.otp
    };
    transport.sendMail(mailContent);
}

