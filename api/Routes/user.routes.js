import express from 'express';
import { test ,updateUser,deleteUser,Signout,getUsers,getUser} from '../Controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';
const Router = express.Router();
Router.get("/test",test);

Router.put("/update/:userId",verifyToken,updateUser);
Router.delete("/delete/:userId",verifyToken,deleteUser);
Router.post("/signout/:userId",verifyToken,Signout);
Router.get("/getUsers",getUsers);
Router.get("/getUser/:userId",getUser);

export default Router;