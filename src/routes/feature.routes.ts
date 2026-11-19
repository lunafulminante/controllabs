import { Router } from 'express';
import { FeatureController } from '../controllers/feature.controller';
import { validateFeatureId } from '../middlewares/validateFeatureId.middleware';

const router = Router();

router.post('/', FeatureController.createFeature);
router.get('/search', FeatureController.getFeaturesByFilter);
router.patch('/:id', validateFeatureId, FeatureController.updateFeature);

export default router;