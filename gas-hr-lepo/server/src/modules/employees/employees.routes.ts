import { Router } from 'express';
import { employeesController } from './employees.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { requirePermission } from '../../middleware/permission.middleware';
import { validate } from '../../middleware/validate.middleware';
import { createEmployeeFields } from './employees.validation';

const router = Router();
router.use(authMiddleware);
router.get('/', requirePermission('View Employees'), employeesController.getAll);
router.get('/:id', requirePermission('View Employees'), employeesController.getOne);
router.post('/', requirePermission('Add Employee'), validate(createEmployeeFields), employeesController.create);
router.patch('/:id', requirePermission('Edit Employee'), employeesController.update);
router.post('/:id/notes', requirePermission('Add Notes'), employeesController.addNote);
export default router;
