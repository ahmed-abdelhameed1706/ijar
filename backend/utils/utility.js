import nodemailer from "nodemailer";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
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

export const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 1, // Allow only 1 request per windowMs
  keyGenerator: function (req /*, res*/) {
    return req.body.email; // Key by email
  },
  handler: function (req, res /*, next*/) {
    return res
      .status(429)
      .json({
        message: "Please wait 2 minutes before sending another request.",
      });
  },
});
