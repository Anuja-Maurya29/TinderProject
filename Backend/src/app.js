import  dotenv  from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dbConnect from './config/database.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import profileRouter from './routes/profileRoutes.js';
import requestRouter from './routes/connectionRoutes.js';


dotenv.config();
const app = express();

//origin : to know where the frontend is hosted
//credentials: send and receive the cookie 
app.use(cors({
    origin:"http://localhost:5173", //why hardcoded?
    credentials:true,
}));
 
dbConnect();
app.use(cookieParser());



app.use(express.json());
app.use("/uploads", express.static("public/uploads"));
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

const PORT = process.env.PORT||8000

app.listen(PORT,()=>console.log(`server is listning on port${PORT}`))