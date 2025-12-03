import generateOtp from "../utils/generateOtp.js";
import { storeOtp, verifyOtp } from "../services/otp.service.js";
import { sendEmailOtp } from "../services/email.service.js";
import { ApiError } from "../utils/apiError.js";

export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const otp = generateOtp();

    await storeOtp(email, otp);
    await sendEmailOtp(email, otp);

    return res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    next(err);
  }
};

export const verifyEmailOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const valid = await verifyOtp(email, otp);
    if (!valid) throw new ApiError(400, "Invalid OTP");

    return res.json({ success: true, message: "OTP verified" });
  } catch (err) {
    next(err);
  }
};
// This controller handles sending and verifying OTPs for email authentication. 