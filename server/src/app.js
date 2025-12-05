import express from 'express';
import { connectDB } from './config/connectDB.js';
import authRoutes from './routes/auth.routes.js';
import { connectRedis } from './config/redis.config.js';
import { globalErrorHandler } from "./utils/globalErrorHandler.util.js";
import cors from 'cors'

await connectRedis();
connectDB();


const app = express();

// ----------------------
// CORS CONFIGURATION
// ----------------------
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend URL
  credentials: true, // if you want to send cookies
}));


app.use(express.json());
app.use(globalErrorHandler);

app.use('/api/auth', authRoutes);


// app.use('/api/users');
// app.use('/api/products');
// app.use('/api/orders');
// app.use('/api/reels');


export default app;