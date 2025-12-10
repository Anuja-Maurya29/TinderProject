import express from 'express'
import profileController from '../controllers/ProfileController.js'

const profileRouter = express.Router();
profileRouter.get('/getProfile',profileController.getProfile)
profileRouter.patch('/createProfile',profileController.createProfile)

export default profileRouter