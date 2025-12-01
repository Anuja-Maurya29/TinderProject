import  dotenv  from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import dbConnect from './config/database.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import profileRouter from './routes/profileRoutes.js';
import requestRouter from './routes/connectionRoutes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

dotenv.config();
const app = express();



dbConnect();
app.use(cookieParser());

app.use(express.json());
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/profile',profileRouter)
app.use('/api/request',requestRouter)


app.get('/',(req,res)=>{
    res.send("server Running")
})

app.get('/home',(req,res)=>{
    res.send("this is home page")
})

const PORT = process.env.PORT||5000

app.listen(PORT,()=>console.log(`server is listning on port${PORT}`))