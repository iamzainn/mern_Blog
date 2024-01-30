import express from 'express';
import { test ,updateUser} from '../Controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';
const Router = express.Router();
Router.get("/test",test);
//auth route
Router.put("/update/:userId",verifyToken,updateUser);

export default Router;