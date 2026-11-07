import { Router } from 'express';
import { DeviceController } from '../controllers/device.controller';
import { validateDeviceId } from '../middlewares/validateDeviceId.middleware';
import { validateDevicePayload } from '../middlewares/validateDevice.middleware';

const router = Router();
router.post('/', validateDevicePayload, DeviceController.createDevice);
router.get('/search', DeviceController.getDevicesByFilter);
router.patch('/:id', validateDeviceId, DeviceController.updateDevice);


export default router;