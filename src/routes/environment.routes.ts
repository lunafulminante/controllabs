import { Router } from 'express';
import * as envCtrl from '../controllers/env.controller';

const router = Router();

router.get('/', envCtrl.listEnvironments);
router.post('/', envCtrl.createEnvironment);
router.patch('/:id', envCtrl.updateEnvPartial);

export default router;
