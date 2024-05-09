import User from '@/models/userModel';

import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail=async ({email, emailType, userId}:any)=>{
    try {
        //configure mail for usage
       const hashedtoken= await bcryptjs.hash(userId.toString(),10)
        if(emailType==="VERIFY")
          {
            await User.findByIdAndUpdate(userId,{
              verifyToken:hashedtoken,
              verifyTokenExpiry:Date.now()+3600000
            })
          }
          else if(emailType==="RESET")
          {
            await User.findByIdAndUpdate(userId,{
              forgotPasswordToken:hashedtoken,
              forgotPasswordTokenExpiry:Date.now()+3600000
            })

            }
            const transport = nodemailer.createTransport({
              host: "sandbox.smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "b13dab3df6c5ad",
                pass: "318fec82d91f8c"
              }
            });

          const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedtoken}
            </p>`
        }
        const mailResponse=await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error:any) {
        throw new Error(error.message);
    }
}