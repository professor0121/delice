import express from 'express';
import { connectDB } from './config/connectDB.js';
const app = express();




connectDB();
export default app;