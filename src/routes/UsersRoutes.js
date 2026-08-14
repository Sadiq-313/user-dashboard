import express from 'express'
import getUsersController from '../controllers/UserController.js'


const UserRoutes = express.Router()



UserRoutes.get('/', getUsersController)
// UserRoutes.post('/users', addUserController)
// UserRoutes.put('/users', UpdateUserController)
// UserRoutes.delete('/users', deletuserController)


export default UserRoutes