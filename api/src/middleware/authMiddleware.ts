import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import {PrismaClient, User} from '@prisma/client';

const prisma = new PrismaClient();

interface RequestWithUser extends Request {
  user: User
}

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  try {
    if (!token) {
      res.status(401).json({ error: 'Нет токена, авторизация отклонена' });
    } else {
      const blacklistedToken = await prisma.tokenBlacklist.findUnique({ where: { token } });

      if (blacklistedToken) {
        res.status(401).json({ error: 'Токен недействителен (в черном списке)' });
      } else {
        const decoded = verifyToken(token);

        console.log(decoded);

        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          await prisma.tokenBlacklist.create({
            data: {
              token: token,
              expiresAt: new Date(decoded.exp * 1000),
            },
          });

          res.status(401).json({ error: 'Токен истек, выполните повторную авторизацию' });
        } else {
          req.user = decoded;
          next();
        }
      }
    }
  } catch (error) {
    res.status(401).json({ error: 'Токен недействителен' });
  }
};
