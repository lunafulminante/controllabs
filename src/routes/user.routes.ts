import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';

const router = Router();

router.get('/', userCtrl.getUsers);
router.post('/', userCtrl.createUser);
router.get('/:id', userCtrl.getUserById);
router.patch('/:id', userCtrl.updateUserPartial);
router.delete('/:id', userCtrl.deleteUserLogical);

export default router;
