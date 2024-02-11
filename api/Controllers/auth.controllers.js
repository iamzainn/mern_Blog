
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

        
        const token = jwt.sign({ userId: existingUser._id,isAdmin:existingUser.isAdmin }, process.env.SECRET,{ 
            expiresIn: '30d' 
        });
        const {_id,email:exEmail,username,profilePicture,isAdmin} = existingUser
        return res.status(201)
        .cookie("token", token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) 
        .json({ message: "Login successfully", user: {_id, exEmail, username, profilePicture, isAdmin}});   
    
    } 
        
        catch (error) {
        next(error);
    }
};

export const googleAuth = async(req,res,next)=>{
    const { username, email, profilePicture } = req.body;
    try {
        let user = await User.findOne({ email });
    
        if (!user) {
            const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const newUser = new User({ username, email, password, profilePicture });
            user = await newUser.save();
        }
    
        const { _id, email: exEmail, username: userUsername, profilePicture: userProfilePicture, isAdmin: userIsAdmin } = user;
    
        const token = jwt.sign({ userId: _id, isAdmin: userIsAdmin }, process.env.SECRET, {
            expiresIn: '30d'
        });
    
        return res.status(201)
            .cookie("token", token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            .json({ message: "Login successfully", user: { _id, exEmail, username:userUsername, profilePicture:userProfilePicture, isAdmin:userIsAdmin } });
    } catch (error) {
        console.error("Error occurred during login/signup:", error);
        return res.status(500).json({ error: "An error occurred during login/signup." });
    }
    

}

