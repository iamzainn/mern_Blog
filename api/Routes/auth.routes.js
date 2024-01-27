import express, { Router } from 'express';
import { signUp } from '../Controllers/auth.controllers.js';
import { signIn } from '../Controllers/auth.controllers.js';

const authRouter = express.Router();

authRouter.post("/signup",signUp);
authRouter.post("/signin",signIn);

export default authRouter;