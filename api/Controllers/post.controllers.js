
import { createError } from "./customError.controllers.js";
import Post from "../Models/post.Models.js";
export const create = async(req,res,next)=>{
  if(!req.user.isAdmin){
    return next(createError(403,"Not allowed To create A Post"))
  }
  const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({...req.body,userId:req.user.userId,slug});
  try{
     await newPost.save();
        return res.status(201).json(newPost);
  }catch(e){
    return next(createError(500,e.message));
  }
}