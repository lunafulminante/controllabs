import { Router } from 'express';
import { DeviceController } from '../controllers/device.controller';
import { validateDeviceId } from '../middlewares/validateDeviceId.middleware';

const router = Router();

router.post('/', DeviceController.createDevice);
router.get('/search', DeviceController.getDevicesByFilter);
router.patch('/:id', validateDeviceId, DeviceController.updateDevice);


export default router;