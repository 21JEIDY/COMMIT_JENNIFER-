
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateUserPayload } from '../middlewares/validateUser.middleware';

const router = Router();

router.post('/', validateUserPayload, UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser);
router.patch('/:id/active', UserController.updateUserActive);

export default router;
