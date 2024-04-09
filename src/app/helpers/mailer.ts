import User from "@/models/user.model";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer"

export const sendEmail = async ({email, emailType, userId}: {email:string, emailType: string, userId: any}) => {
    try {
        // create hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
    
        
        switch(emailType) {
            case "VERIFY":
                // store hashedToken in database
                await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + (60*60*1000)}) // 60*60*1000 mili sec 
                break;
            case "RESET":
                // store hashedToken in database
                await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now()+ (60*60*1000)})
        }
    
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "3bbb8b6a27c2a5",
              pass: "6035a4e3f8f609"
            }
          });
    
          var message = {
            from: "admin@foodDelivery.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            text: "Plaintext version of the message",
            html: `<p>Click <a href="${process.env.BASE_URL}/api/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.BASE_URL}/api/verifyemail?token=${hashedToken}
            </p>`,
          };
    
          const mailResponse = await transporter.sendMail(message)
    
          return mailResponse; 
    } catch (err: any) {
        console.log("sendMail error")
        console.log(err);
        // throw new Error(err.message);
        // throw new Error(error.message);

    }
    
}