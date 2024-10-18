import { Request, Response, NextFunction } from 'express';
import {IUser} from "../../types";

export const permit = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;

    if (user && allowedRoles.includes(user.role)) {
      next(); // Если роль пользователя разрешена, переходим к следующему middleware
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
};
