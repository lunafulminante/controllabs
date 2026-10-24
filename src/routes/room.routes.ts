import { Router } from 'express';
import { RoomController } from '../controllers/room.controller';

const router = Router();

router.post('/', RoomController.createRoom);
router.get('/search', RoomController.getRoomsByFilter);
router.patch('/:id', RoomController.updateRoom);


export default router;