import express from 'express';
import { connectDB } from './config/connectDB.js';
import authRoutes from './routes/auth.routes.js';
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users');
app.use('/api/products');
app.use('/api/orders');
app.use('/api/reels');


connectDB();
export default app;