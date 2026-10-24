import { Router } from 'express';
import loanRoutes from './loan.routes';
import userRoutes from './user.routes';
import roomRoutes from './room.routes';
import deviceRoutes from './device.routes';
import featureRoutes from './feature.routes';


const router = Router();
router.use('/loans', loanRoutes);
router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);
router.use('/devices', deviceRoutes);
router.use('/features', featureRoutes);
export default router;