import { Router } from 'express';
import * as dashboardCtrl from '../controllers/dashboard.controller';

const router = Router();

router.get('/summary', dashboardCtrl.getSummary);

export default router;
