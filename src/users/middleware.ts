import { Request, Response, NextFunction } from 'express';
import usersService from './service.users';

interface CustomRequest extends Request {
  user?: { id: string, isAdmin: boolean; username: string, email: string, password: string; };
}

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Admin permissions required.' });
  }
  next();
};

export const hasUserPermission = (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.user;
  const requestedUserId = req.params.id;

  if (!user || (!user.isAdmin && user.id !== requestedUserId)) {
    return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
  }
  next();
};






