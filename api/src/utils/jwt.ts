import jwt from 'jsonwebtoken';
import { IUser } from '../../types';

const SECRET_KEY = 'SECRET_KEY'; // Важно: используй переменную окружения в реальном приложении

// Генерация JWT
export const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user._id,
      telegramId: user.telegramId,
      name: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

// Проверка JWT
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid Token');
  }
};