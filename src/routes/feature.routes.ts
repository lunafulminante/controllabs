import { Router } from 'express';
import { FeatureController } from '../controllers/feature.controller';

const router = Router();

router.post('/', FeatureController.createFeature);
router.get('/search', FeatureController.getFeaturesByFilter);
router.patch('/:id', FeatureController.updateFeature);


export default router;