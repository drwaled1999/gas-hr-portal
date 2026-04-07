import { Request, Response } from 'express';
import { permissionsService } from './permissions.service';

export const permissionsController = {
  getAll(_req: Request, res: Response) { return res.json(permissionsService.getAll()); },
  save(req: Request, res: Response) { return res.status(201).json({ message: 'Permissions assigned successfully', data: permissionsService.save(req.body) }); }
};
