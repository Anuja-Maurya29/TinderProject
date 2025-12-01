import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';

import  userController  from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/getAllRequest',authMiddleware,userController.getAllRequest)
userRouter.get('/getConnections',authMiddleware,userController.getConnections)
userRouter.get('/explore',authMiddleware, userController.explore)

export default userRouter

