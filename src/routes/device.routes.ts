import { Router } from 'express';
import { DeviceController } from '../controllers/device.controller';

const router = Router();

router.post('/', DeviceController.createDevice);
router.get('/search', DeviceController.getDevicesByFilter);
router.patch('/:id', DeviceController.updateDevice);


export default router;