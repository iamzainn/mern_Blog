import User  from'../Models/user.Models.js';
import { createError } from './customError.controllers.js';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    if(!username || !password || !email || username == ""|| password == ""|| email == ""){
        next(createError(400,"all fields are required"))
    }
    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            next(createError(400,"user already exist"))
        }
       

  
        const newUser = new User({ username, email, password });

        
        await newUser.save();

        
        res.status(201).json({ message: "Sign up successful" });
    } catch (error) {
        
        next(error);
    }
};