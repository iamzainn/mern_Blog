import { createError } from "./customError.controllers.js";
import User from "../Models/user.Models.js";
import bcrypt from 'bcryptjs';



export  const test = (req,res)=>{
    res.json({"message":"API is working"})
}

export const updateUser = async (req, res, next) => {
    const { userId: paramId } = req.params;
    const { userId: validId } = req.user;
  
    if (paramId !== validId) {
      return next(createError(403, "Not allowed to update user info"));
    }
  
    try {
      const { username, password } = req.body;
  
      if (username?.length < 5) {
        return next(createError(400, "Username must be greater than 5 characters"));
      }
  
      if (password?.length < 4) {
        return next(createError(400, "Password must be greater than 4 characters"));
      }

      const salt = await bcrypt.genSalt(10);

        
        const hashedPassword = await bcrypt.hash(password, salt);
  
      const updateUser = await User.findByIdAndUpdate(
        paramId,
        {
          $set: {
            username,
            email: req.body.email ,
            password : hashedPassword,
            profilePicture: req.body.profilePicture ,
          },
        },
        { new: true }
      );
  
     
  
      const { _id, username: newName, email: exEmail, profilePicture } = updateUser._doc;
      return res.status(200).json({
        message: "User updated successfully",
        user: { _id, username: newName, email: exEmail, profilePicture },
      });
  
    } catch (error) {
      next(createError(400, error.message));
    }
  };