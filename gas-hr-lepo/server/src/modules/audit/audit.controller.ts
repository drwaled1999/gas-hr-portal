import { Request, Response } from 'express';
import { auditService } from './audit.service';
export const auditController = { getAll(_req: Request, res: Response) { return res.json(auditService.getAll()); } };
