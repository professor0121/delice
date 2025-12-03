import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ;
export const MONGO_URI = process.env.MONGO_URI ;


export const REDIS_EMAIL = process.env.REDIS_EMAIL ;
export const REDIS_USERNAME = process.env.REDIS_USERNAME ;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD ;
export const REDIS_HOST = process.env.REDIS_HOST ;
export const REDIS_PORT = process.env.REDIS_PORT ;


export const EMAIL_SERVICE = process.env.EMAIL_SERVICE ;
export const EMAIL_USER = process.env.EMAIL_USER ;
export const EMAIL_PASS = process.env.EMAIL_PASS ;


export const APP_EMAIL = process.env.APP_EMAIL ;

export const JWT_SECRET = process.env.JWT_SECRET ;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ;


export const NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL ;
export const NODEMAILER_PASS = process.env.NODEMAILER_PASS ;
export const NODEMAILER_APP_NAME = process.env.NODEMAILER_APP_NAME ;