import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';

const router = Router();

router.post('/', DashboardController.createDashboard);
router.get('/search', DashboardController.getDashboardsByFilter);
router.patch('/:id', DashboardController.updateDashboard);


export default router;