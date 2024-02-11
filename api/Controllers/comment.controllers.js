import Comment from '../Models/comment.Models.js';
import { createError } from './customError.controllers.js';
export const createComment = async (req, res, next) => {
  
  try {
    const { content, postId, userId } = req.body;
    
    if (userId !== req.user.userId) {
      return next(
        createError(403, 'You are not allowed to create this comment')
      );
    }
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
export const toggleLike = async (req, res, next) => {
    const { userId } = req.user;
    const { commentId } = req.params;
   
    try {
        const comment = await Comment.findOne({ _id: commentId });
        if (comment) {
            if (userId) {
                const userIdString = String(userId); 
                const userIndex = comment.likes.indexOf(userIdString); 
                
                if (userIndex === -1) {
                    comment.likes.push(userIdString);
                    comment.numberOfLikes += 1;
                } else {
                    
                    comment.likes.splice(userIndex, 1);
                    comment.numberOfLikes -= 1;
                }
                await comment.save(); 
                return res.status(200).json(comment);
            } else {
                return next(createError(400, "Invalid user ID"));
            }
        } else {
            return next(createError(404, "COMMENT NOT FOUND"));
        }
    } catch (e) {
        return next(createError(500, e.message));
    }
};



export const editComment = async (req, res, next) => {
  const { userId,commentId } = req.params;
  const {content} = req.body;
    if(!(userId === req.user.userId)){
    return next(createError(400,"Not allowed to edit"))
    }
  try {
      const comment = await Comment.findOne({ _id: commentId,userId });
      if (comment) {
          comment.content = content;
          await comment.save();
          return res.status(200).json(comment);
         
      } else {
          return next(createError(404, "COMMENT NOT FOUND"));
      }
  } catch (e) {
      return next(createError(500, e.message));
  }
};

export const delComment = async (req, res, next) => {
  const { userId,commentId } = req.params;
  
    if(!(userId === req.user.userId) && (!req.user.isAdmin)){
    return next(createError(400,"Not allowed to del"))
    }
  try {
    const comment =  await Comment.findOneAndDelete({ _id: commentId })
 
   return res.status(200).json({"message":"deleted succefully",comment});
  } catch (e) {
      return next(createError(500, e.message));
  }
};


export const getComments = async(req,res,next)=>{
  if(!req.user.isAdmin)
  {return next(createError(403,"Error in getting comments"))}
  try{
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalComments = await Comment.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      comments,
      totalComments,
      lastMonthComments,
    });

  }catch(e){
    return next(createError(400,e.message));
  }
}