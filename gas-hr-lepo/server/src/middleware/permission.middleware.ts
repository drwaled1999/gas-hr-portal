import { NextFunction, Request, Response } from 'express';

export function requirePermission(permissionKey: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissions = req.user?.permissions || [];
    if (!permissions.includes(permissionKey) && req.user?.role !== 'HR Manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}
