import express from 'express';
import { test ,updateUser,deleteUser,Signout} from '../Controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';
const Router = express.Router();
Router.get("/test",test);
//validate route
Router.put("/update/:userId",verifyToken,updateUser);
Router.delete("/delete/:userId",verifyToken,deleteUser);
Router.post("/signout/:userId",verifyToken,Signout);

export default Router;