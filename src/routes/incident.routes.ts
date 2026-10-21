import { Router } from 'express';
import * as incidentCtrl from '../controllers/incident.controller';

const router = Router();

router.post('/', incidentCtrl.createIncident);
router.get('/', incidentCtrl.listIncidents);
router.patch('/:id', incidentCtrl.updateIncidentStatus);

export default router;
