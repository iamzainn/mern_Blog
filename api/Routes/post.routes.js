import express from 'express';
import { create,getPosts,deletePost } from '../Controllers/post.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';

const postRouter = express.Router();

postRouter.post("/create",verifyToken,create);
postRouter.get("/getPosts",getPosts);
postRouter.delete("/delete/:userId/:postId",verifyToken,deletePost);

export default postRouter;