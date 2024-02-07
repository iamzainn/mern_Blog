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
    console.log("user id " + userId);
    console.log("comment id " + commentId);
    try {
        const comment = await Comment.findOne({ _id: commentId });
        if (comment) {
            if (userId) {
                const userIdString = String(userId); // Convert userId to string
                const userIndex = comment.likes.indexOf(userIdString); // Find user index after converting to string
                console.log(userIndex);
                if (userIndex === -1) {
                    comment.likes.push(userIdString);
                    comment.numberOfLikes += 1;
                } else {
                    console.log("like already exists");
                    comment.likes.splice(userIndex, 1);
                    comment.numberOfLikes -= 1;
                }
                await comment.save(); // Save the updated comment
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
