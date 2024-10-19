import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware для проверки авторизации и черного списка
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Проверяем, есть ли токен в черном списке
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Нет токена, авторизация отклонена' });
    } else {
      const blacklistedToken = await prisma.tokenBlacklist.findUnique({ where: { token } });

      if (blacklistedToken) {
        res.status(401).json({ error: 'Токен недействителен' });
      } else {
        // Проверяем валидность токена
        const decoded = verifyToken(token);
        req.user = decoded; // сохраняем информацию о пользователе в req
        next();
      }
    }
  } catch (error) {
    res.status(401).json({ error: 'Токен недействителен' });
  }
};
