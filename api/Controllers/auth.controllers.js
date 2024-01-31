
import User  from'../Models/user.Models.js';
import { createError } from './customError.controllers.js';
import jwt from 'jsonwebtoken';



export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    if(!username || !password || !email || username == ""|| password == ""|| email == ""){
       return next(createError(400,"All fields are required"))
    }
    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
           return next(createError(400,"user already exist"))
        }
       

  
        const newUser = new User({ username, email, password });

        
        await newUser.save();

        
        res.status(201).json({ message: "Sign up successful" });
    } catch (error) {
        
        next(error);
    }
};




export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    if ( !password || !email  || password === "" || email === "") {
        return next(createError(400, "All fields are required"));
    }

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return next(createError(400, "User not exist"));
        }

        const isPasswordValid = await existingUser.checkPassword(password);

        if (!isPasswordValid) {
            return next(createError(400, "Password is invalid"));
        }

        
        const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET, { expiresIn:"1hr"});
        const {_id,email:exEmail,username,profilePicture} = existingUser
       return res.status(201).cookie("token", token).json({ message: "Login successfully",user:{_id,exEmail,username,profilePicture}});
    } catch (error) {
        next(error);
    }
};

export const googleAuth = async(req,res,next)=>{
     const {username,email,profilePicture} = req.body;
    try{
       const user = await User.findOne({email});
       if(user){
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn:"1hr" });
        const {_id,email:exEmail} = user
       return res.status(201).cookie("token", token).json({ message: "Login successfully",user:{_id,exEmail,username:user.username,profilePicture:user.profilePicture}});
       }else{
        const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
       
       const newName =  username.toLowerCase().split(" ").join("")+Math.random().toString(9).slice(-4);
        const newUser = new User({ username:newName, email, password, profilePicture })
        await newUser.save();
         const token = jwt.sign({ userId: newUser._id }, process.env.SECRET, { expiresIn:'1hr' });
         const {_id,email:exEmail} = newUser._doc
       return res.status(201).cookie("token", token).json({ message: "Login successfully",user:{_id,exEmail,username:newUser.username,profilePicture:newUser.profilePicture}});

       }
        
 }catch(error){
  next(error);
 }

}

