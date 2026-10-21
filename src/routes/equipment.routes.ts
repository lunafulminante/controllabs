import { Router } from 'express';
import * as equipCtrl from '../controllers/equipment.controller';

const router = Router();

router.post('/', equipCtrl.registerEquipment);
router.get('/', equipCtrl.listEquipment);
router.patch('/:id', equipCtrl.updateEquipmentStatus);

export default router;
