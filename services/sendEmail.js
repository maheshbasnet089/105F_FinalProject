const nodemailer = require('nodemailer')


async function sendEmail(data){
    // logic to send Email 

   const transporter =  nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.email,
            pass : process.env.emailAppPassword
        }
    })

    const mailOption = {
        from  : "Manish Basnet<dptest1230@gmail.com>",
        to : data.email,
        subject : data.subject,
        text : data.text
    }

   await transporter.sendMail(mailOption)

}

module.exports = sendEmail