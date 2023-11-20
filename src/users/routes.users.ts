import express from 'express';
import  usersController  from './controller.users';

const usersRouter = express.Router();

usersRouter.get('/',usersController.getAlllUsers)
usersRouter.get('/:id',usersController.getUserByID)
usersRouter.put('/:id',usersController.updateUserById)
usersRouter.post('/register', usersController.registerUser);
usersRouter.post('/login', usersController.loginUser);
usersRouter.delete('/delete/:id', usersController.deleteUserById);
// usersRouter.post('/forgot-password', usersController.resetPassword);


export default usersRouter;

