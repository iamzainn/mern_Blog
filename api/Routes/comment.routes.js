import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { createComment,getPostComments,toggleLike,editComment,delComment,getComments} from '../Controllers/comment.controllers.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId',verifyToken,toggleLike);
router.put('/edit/:userId/:commentId',verifyToken,editComment);
router.delete('/del/:userId/:commentId',verifyToken,delComment);
router.get('/getComments',verifyToken,getComments);

export default router;