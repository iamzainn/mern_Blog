import express from 'express';
import { connectDb } from './connectDb.js';
import userRouter from './Routes/user.routes.js';
import cors from 'cors';
import authRouter from './Routes/auth.routes.js';
import { errorMiddleware } from './Controllers/customError.controllers.js';
import { notFound } from './Controllers/customError.controllers.js';

const app = express();
connectDb();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/api/user/',userRouter);
app.use('/api/auth',authRouter);


app.use(notFound);
app.use(errorMiddleware)

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})