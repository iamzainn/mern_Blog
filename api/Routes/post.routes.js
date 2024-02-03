import express from 'express';
import { create,getPosts } from '../Controllers/post.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';

const postRouter = express.Router();

postRouter.post("/create",verifyToken,create);
postRouter.get("/getPosts",getPosts);

export default postRouter;