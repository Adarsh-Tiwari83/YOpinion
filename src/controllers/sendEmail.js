const nodemailer=require('nodemailer');


let sendEmail=async(email,sentOTP)=>{
    // console.log("hh");
    // let testAccount=await nodemailer.createTestAccount();
    try{
        console.log(email,sentOTP);
        const transporter =await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: "587",
            secure:false,
            requireTLS:true,
            auth: {
                user: 'at6175046@gmail.com',
                pass: process.env.SMTP_PASS
            }
        });
        // console.log(transporter);
        const mailInfo={
            from:'at6175046@gmail.com',
            to:'tadarsh249@gmail.com',
            subject:'Email OTP Verification',
            html:"<h2>OTP for Email Verification is : "+sentOTP+"</h2>"
        };
        await transporter.sendMail(mailInfo,function (err,info) {
            if(err) console.log(err);
            else console.log("message sent :"+info.response);
        })
    }
    catch(error){
        console.log(error.message);
    }
};

module.exports=sendEmail;