import { createError } from "../Controllers/customError.controllers.js";
import  jwt from "jsonwebtoken";
export const verifyToken = (req, _, next) => {
    
    const token = req.cookies.token;
     
  
    if (!token) {
       return  next(createError(401,'Unauthorized: Token not provided'))
     
    }

    jwt.verify(token, process.env.SECRET, (err,user) => {
      if (err) {
        return  next(createError(401,'Unauthorized: Token is invalid'))
      }
      req.user = user;
      next();
    });
  };