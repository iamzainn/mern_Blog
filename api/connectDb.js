import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


export const connectDb = async()=>{
try{
    await mongoose.connect(process.env.MONGO)
    console.log("database connected successfully")
}catch(error){
console.log("Error in db connection : "+error)
}
}
 

