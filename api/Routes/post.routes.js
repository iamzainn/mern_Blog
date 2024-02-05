import express from 'express';
import { create,getPosts,deletePost,updatePost } from '../Controllers/post.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';

const postRouter = express.Router();

postRouter.post("/create",verifyToken,create);
postRouter.get("/getPosts",getPosts);
postRouter.delete("/delete/:userId/:postId",verifyToken,deletePost);
postRouter.post("/update/:userId/:postId",verifyToken,updatePost);


export default postRouter;