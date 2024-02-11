
import { createError } from "./customError.controllers.js";
import Post from "../Models/post.Models.js";
export const create = async(req,res,next)=>{
  if(!req.user.isAdmin){
    return next(createError(403,"Not allowed To create A Post"))
  }
  
  const slug = req.body?.title?.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({...req.body,userId:req.user.userId,slug});
  try{
     await newPost.save();
        return res.status(201).json(newPost);
  }catch(e){
    return next(createError(500,e.message));
  }
}
export const getPosts = async (req, res, next) => {
  try {
     

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const order = req.query.order === 'asc' ? 1 : -1;

  
   

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { Category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { Content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: order })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};
 export const deletePost = async(req,res,next)=>{
  const {userId,postId} = req.params;
 
  if(userId !== req.user.userId){
   return next(createError(403,'Not allowed to delete a post'))
  }
 try{
  await Post.findByIdAndDelete(postId);
 
  return res.status(200).json({"message":"post deleted successfully"});
 }catch(error){
  next(createError(400,error.message));
 }

}

export const updatePost = async(req,res,next)=>{
  const {postId} = req.body;
  if(!req.user.isAdmin){
    return next(createError(403,"Not allowed To update A Post"))
  }
  
  const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
  

  try{
    const postFind = await Post.findOne({postId});
    if(postFind){
      postFind.title = req.body.title ,
      postFind.Content = req.body.Content,
      postFind.img = req.body.img,
      postFind.Category = req.body.Category
      postFind.slug = slug
    }
    await postFind.save();
    
    return res.status(200).json({"message":"post updated successfully","post":postFind});
    
  }catch(error){
    return next(createError(400,error.message));
  }
}