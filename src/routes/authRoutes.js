import express from 'express'

import { loginController, signupController } from '../controllers/AuthController.js'


const AuthRoutes = express.Router()


AuthRoutes.post('/signup', signupController)
AuthRoutes.post('/login', loginController)



export default AuthRoutes