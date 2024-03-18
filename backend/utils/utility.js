import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = (email, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const uniqueSubject = subject + " - " + new Date().getTime();

  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: email,
    subject: uniqueSubject,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
