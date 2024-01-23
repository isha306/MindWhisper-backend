const nodemailer = require("nodemailer")

exports.sendEmail = (req, res) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "isha.9216778@gmail.com",
                pass: "kkjv arzn pfsz uhjq"
            }
        })
        const data = {
          form:"isha.9216778@gmail.com",
          to:req.body.email,
          subject:req.subject,
          text:req.text
        }
        transport.sendMail(data,(error,info)=>{
            if(error){
                console.log(error);
                res.status(400).json({message:"Email delivery error"})
            }else{
                console.log(info);
                res.status(201).json({message:"Sucess"})
            }
        })
    } catch (error) {

    }
}