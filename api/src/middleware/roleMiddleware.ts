import { Request, Response, NextFunction } from 'express';
import {User} from "@prisma/client";

export interface RequestWithUser extends Request {
  user: User;
}

export const permit = (role: string) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'No access' });
    }
    next();
  };
};
