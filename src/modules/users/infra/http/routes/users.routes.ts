import multer from 'multer';
import { Router } from 'express';
import UserController from '../controllers/userController';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';


const usersRouter = Router()
const userController = new UserController()
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer)

// find all
usersRouter.get('/', userController.index)

// find by id
usersRouter.get('/:id', userController.show)

// create user
usersRouter.post('/', userController.create)

// delete people
usersRouter.delete('/:id', userController.delete)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
