import { Router } from 'express';
import { permissionsController } from './permissions.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { requirePermission } from '../../middleware/permission.middleware';

const router = Router();
router.use(authMiddleware);
router.get('/', requirePermission('View Employees'), permissionsController.getAll);
router.post('/', requirePermission('Edit Employee'), permissionsController.save);
export default router;
