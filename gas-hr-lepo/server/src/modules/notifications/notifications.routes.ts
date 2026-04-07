import { Router } from 'express';
import { notificationsController } from './notifications.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
router.use(authMiddleware);
router.get('/', notificationsController.getAll);
router.patch('/:id/read', notificationsController.markRead);
export default router;
