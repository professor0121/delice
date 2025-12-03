import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from "./env.config.js";

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});
