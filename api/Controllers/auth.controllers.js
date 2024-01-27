
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

        
        const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET, { expiresIn: '1h' });
        const {_id,email:exEmail,username} = existingUser
       return res.status(200).cookie("token", token).json({ message: "Login successfully",user:{_id,exEmail,username}});
    } catch (error) {
        next(error);
    }
};

