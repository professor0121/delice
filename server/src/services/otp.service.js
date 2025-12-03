import { getRedis } from "../config/redis.config.js";

export const storeOtp = async (email, otp) => {
  const redis = getRedis();
  await redis.setEx(`otp:${email}`, 300, otp); // 5 minutes
};

export const verifyOtp = async (email, otp) => {
  const redis = getRedis();

  const storedOtp = await redis.get(`otp:${email}`);

  if (!storedOtp) return false;
  if (storedOtp !== otp) return false;

  await redis.del(`otp:${email}`);
  return true;
};
// This service provides functions to store and verify OTPs using Redis.