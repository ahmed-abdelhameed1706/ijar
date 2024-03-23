import dotenv from "dotenv";

dotenv.config();
const env_mode = process.env.ENV_MODE;
let URL = process.env.MAIL_URL;

if (env_mode === "dev") {
  URL = process.env.MAIL_URL_LOCAL;
}

export const resetPasswordForm = (name, token) => {
  return `<!DOCTYPE html> 
    <html lang="en"> 
    <body style="display: flex; justify-content: center;">
        <table style="width: 100%;">
            <tr>
                <td style="padding: 20px; text-align: center;">
                    <h3 style="text-align: left;">Hey ${name},</h3>
                    <p style="text-align: left;">We received a request to reset your password for your account on <strong>Ijar</strong>.</p>
                    <p style="text-align: left;">If you requested this password reset, please click the following button to access a like to create a new password:</p>
                    <br>
                    <a href="${URL}/api/users/reset_password/${token}" style="background-color: #4CAF50;
                                color: white;
                                text-decoration: none;
                                padding: 8px 20px;
                                border-radius: 3px;
                                text-align: center;
                                font-size: 16px;
                                height: 100%;
                                width:100%;
                                cursor: pointer;
                    ">Reset Password</a>
                    <br>
                    <br>
                    <p style="text-align: left;">This link will expire in <strong>tow hours</strong> for your security. If you don't reset your password within this time, you can request a new link.</p>
                    <p style="text-align: left;">If you did not request a password reset, please disregard this email.</p>
                    <p style="text-align: left;">However, for your account security, we recommend that you change your password at your earliest convenience.</p>
                    <p style="text-align: left;">You can do this by logging in to your account and going to your profile settings.</p>
                    <br>
                    <p style="text-align: left;">Thanks,</p>
                    <h4 style="text-align: left;">The Ijar Team</h4>
                </td>
            </tr>
        </table>
    </body> 
    </html> 
  `;
};

export const verifyEmailForm = (name, token) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <body>
        <table style="width: 100%;">
            <tr>
                <td style="padding: 5px 15px; text-align: center;">
                    <h3 style="text-align: left;">Hey ${name},</h3>
                    <p style="text-align: left;">Thanks for signing up for <strong>Ijar</strong>!</p>
                    <p style="text-align: left;">To complete your registration and access all our features, please verify your email address by clicking the button below:</p>
                    <br>
                    <a href="${URL}/auth/verify/${token}" style="background-color: #4CAF50;
                        color: white;
                        text-decoration: none;
                        padding: 8px 20px;
                        border-radius: 3px;
                        text-align: center;
                        font-size: 15px;
                        height: 100%;
                        width:100%;
                        cursor: pointer;
                    ">Verify Your Email</a>
                    <br>
                    <br>
                    <p style="text-align: left;">This verification helps ensure your account security.</p>
                    <p style="text-align: left;">If you didn't create an account with <strong>Ijar</strong>, please disregard this email.</p>
                    <br>
                    <p style="text-align: left;">Thanks,</p>
                    <h4 style="text-align: left;">The Ijar Team</h4>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};
