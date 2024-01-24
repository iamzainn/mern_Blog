import express from 'express';
import { connectDb } from './connectDb.js';
import userRouter from './Routes/user.routes.js';

const app = express();
connectDb();


app.use('/api/user/',userRouter);
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})