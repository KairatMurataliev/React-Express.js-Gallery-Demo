import {NextFunction, Request, Response} from 'express';
import {verifyToken} from './jwt';
import {prisma} from "../../prisma/prisma-client";

export const authMiddleware = async (expressReq: Request, res: Response, next: NextFunction) => {
  const authHeader = expressReq.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = verifyToken(token);
      if (decoded) {
        const user = await prisma.user.findFirst({where: {token}})

        if (user) {
          expressReq.user = user;
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