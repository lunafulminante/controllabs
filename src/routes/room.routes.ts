import { Router } from 'express';
import { RoomController } from '../controllers/room.controller';
import { validateRoom } from '../middlewares/validateRoom.middleware';

const router = Router();

router.post('/', validateRoom, RoomController.createRoom);
router.get('/search', RoomController.getRoomsByFilter);
router.patch('/:id', RoomController.updateRoom);

export default router;
