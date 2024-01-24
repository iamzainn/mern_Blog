import express from 'express';
import { connectDb } from './connectDb.js';

const app = express();
connectDb();

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})