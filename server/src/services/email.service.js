import { mailTransporter } from "../config/email.config.js";

export const sendEmailOtp = async (email, otp) => {
  const mailOptions = {
    from: `"MyApp Verification" <no-reply@myapp.com>`,
    to: email,
    subject: "Your OTP Code",
    html: `
      <h2>Your OTP Verification Code</h2>
      <p style="font-size: 20px; font-weight: bold;">${otp}</p>
      <p>This OTP is valid for 5 minutes.</p>
    `,
  };

  return await mailTransporter.sendMail(mailOptions);
};
// This service function sends an OTP email to the specified address using nodemailer.