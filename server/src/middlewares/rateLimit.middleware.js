import { getRedis } from "../config/redis.config.js";

export const rateLimit = (limit = 3, windowSeconds = 60) => {
  return async (req, res, next) => {
    const redis = getRedis();
    const email = req.body.email;

    const key = `rate:${email}`;
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, windowSeconds);
    }

    if (count > limit) {
      return res.status(429).json({
        success: false,
        message: "Too many OTP requests. Try again later.",
      });
    }

    next();
  };
};
// This middleware limits the number of OTP requests per email within a specified time window using Redis.