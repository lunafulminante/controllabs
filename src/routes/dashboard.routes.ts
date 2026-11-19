import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { validateDashboardId } from '../middlewares/validateDashboardId.middleware';

const router = Router();

router.use((req, _res, next) => {
  console.log('DASHBOARD ROUTER RECIBIÓ:', req.method, req.originalUrl);
  next();
});

router.post('/', DashboardController.createDashboard);
router.get('/search', DashboardController.getDashboardsByFilter);
router.patch('/:id', validateDashboardId, DashboardController.updateDashboard);

export default router;