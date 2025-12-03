import { createClient } from 'redis';
import { REDIS_USERNAME, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } from './env.config.js';

let redisClient;

export const connectRedis = async () => {
  redisClient = createClient({
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    socket: {
      host: REDIS_HOST,
      port: Number(REDIS_PORT),
    },
  });

  redisClient.on("connect", () => {
    console.log("🌟 Redis Connected Successfully");
  });

  redisClient.on("error", (err) => {
    console.log("❌ Redis Client Error:", err);
  });

  await redisClient.connect();
};

export const getRedis = () => redisClient;
