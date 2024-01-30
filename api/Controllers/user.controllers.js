import { createError } from "./customError.controllers.js";
import User from "../Models/user.Models.js";




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
      if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return next(createError(400, "Username must contain letters and numbers only"));
      }
      
  
      if (password?.length < 4) {
        return next(createError(400, "Password must be greater than 4 characters"));
      }

      
  
      const updateUser = await User.findById(paramId);
      if(updateUser){
        updateUser.username = req.body.username || updateUser.username
        updateUser.email = req.body.email || updateUser.email
        updateUser.password = req.body.username || updateUser.email 
        updateUser.profilePicture = req.body.profilePicture || updateUser.profilePicture
      }
      await updateUser.save();
  
     
  
      const { _id, username: newName, email: exEmail, profilePicture } = updateUser._doc;
      return res.status(200).json({
        message: "User updated successfully",
        user: { _id, username: newName, exEmail: exEmail, profilePicture },
      });
  
    } catch (error) {
      next(createError(400, error.message));
    }
  };