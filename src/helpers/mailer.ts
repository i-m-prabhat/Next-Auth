import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }: any) =>
{
    try
    {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY")
        {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET")
        {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        // var transport = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: "3fd364695517df",
        //         pass: "7383d58fd399cf"
        //         //TODO: add these credentials to .env file
        //     }
        // });

        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",// you can change your host
            port: 465,
            secure: true,
            service: "Gmail",

            auth: {
                user: process.env.USERMAIL, //add user mail
                pass: process.env.USERPASS, // add mail app password
            },
        });


        const mailOptions = {
            from: process.env.USERMAIL,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
            (mailOptions);
        return mailresponse;
    } catch (error: any)
    {
        throw new Error(error.message);
    }
}