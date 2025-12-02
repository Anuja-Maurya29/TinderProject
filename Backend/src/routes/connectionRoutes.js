import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import connectionControllers from '../controllers/connectionControllers.js'

const requestRouter = express.Router()


requestRouter.post('/send/:status/:toUser',authMiddleware,connectionControllers.request)

requestRouter.post('/review/:status/:requestId',authMiddleware,connectionControllers.review)

// requestRouter.get('/getAllRequest',authMiddleware,connectionControllers.getAllRequest)

 export  default requestRouter
 