import express from 'express';
import { create } from '../Controllers/post.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';

const postRouter = express.Router();

postRouter.post("/create",verifyToken,create);


export default postRouter;