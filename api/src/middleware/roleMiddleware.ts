import { Request, Response, NextFunction } from 'express';
import {RequestWithUser} from "../../types";

export const permit = (role: string) => {
  return (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as RequestWithUser;
    if (req.user?.role !== role) {
      res.status(403).json({ error: 'No access' });
    } else {
      next();
    }
  };
};
