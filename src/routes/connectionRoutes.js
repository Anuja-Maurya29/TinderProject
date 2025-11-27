import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import connectionControllers from '../controllers/connectionControllers.js'

const requestRouter = express.Router()


requestRouter.post('/send/:status/:toUser',authMiddleware,connectionControllers.request)

// connectionRequestRouter.post('/review/:status/:requestId',authMiddleware)


 export  default requestRouter