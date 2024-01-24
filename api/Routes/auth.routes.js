import express, { Router } from 'express';
import { signUp } from '../Controllers/auth.controllers.js';

const authRouter = express.Router();

authRouter.post("/signup",signUp);

export default authRouter;