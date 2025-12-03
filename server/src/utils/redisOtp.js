import { getRedis } from "../config/redis.config.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { NODEMAILER_PASS, NODEMAILER_EMAIL } from "../config/env.config.js";

export const sendOTP = async (email) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  console.log("Generated OTP:", otp);

  const redis = getRedis(); // << IMPORTANT FIX

  await redis.set(`otp:${email}`, otp, { EX: 300 }); // expires in 5 min

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: NODEMAILER_EMAIL,
      pass: NODEMAILER_PASS,
    },
  });

  await transporter.sendMail({
    from: NODEMAILER_EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  });

  return otp;
};
export const verifyOTP = async (email, otp) => {
  const redis = getRedis(); // << IMPORTANT FIX
  const storedOtp = await redis.get(`otp:${email}`);
  return storedOtp === otp;
};
