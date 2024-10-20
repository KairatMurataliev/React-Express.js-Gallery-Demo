import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ error: 'Нет токена, авторизация отклонена' });
    } else {
      const blacklistedToken = await prisma.tokenBlacklist.findUnique({ where: { token } });

      if (blacklistedToken) {
        res.status(401).json({ error: 'Токен недействителен' });
      } else {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
      }
    }
  } catch (error) {
    res.status(401).json({ error: 'Токен недействителен' });
  }
};
