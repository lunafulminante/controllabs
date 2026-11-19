import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateUserPayload } from '../middlewares/validateUser.middleware';
import { validateUserId } from '../middlewares/validateUserId.middleware';

const router = Router();

router.post('/', validateUserPayload, UserController.createUser);
router.get('/search', UserController.getUsersByFilter);
router.get('/:id', validateUserId, UserController.getUserById);
router.patch('/:id', validateUserId, UserController.updateUser);
router.delete('/:id', validateUserId, UserController.deleteUser);

export default router;