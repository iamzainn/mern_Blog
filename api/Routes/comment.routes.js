import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { createComment,getPostComments } from '../Controllers/comment.controllers.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);

export default router;