import {NextFunction, Request, Response} from 'express';
import {verifyToken} from './jwt';
import {HydratedDocument} from "mongoose";
import User, {IUser} from "../models/user.model";

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUser>
}

export const authMiddleware = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as RequestWithUser;
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = verifyToken(token);
      if (decoded) {
        const user = await User.findOne({ token: decoded });

        if (user) {
          req.user = user;
          next();
        }
      }
    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Authorization header missing' });
  }
};

export default authMiddleware;