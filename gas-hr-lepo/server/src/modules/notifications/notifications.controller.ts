import { Request, Response } from 'express';
import { notificationsService } from './notifications.service';

export const notificationsController = {
  getAll(_req: Request, res: Response) { return res.json(notificationsService.getAll()); },
  markRead(req: Request, res: Response) {
    const notification = notificationsService.markRead(Number(req.params.id));
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    return res.json({ message: 'Notification marked as read', data: notification });
  }
};
