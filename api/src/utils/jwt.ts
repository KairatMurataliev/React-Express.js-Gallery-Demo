import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';

const SECRET_KEY = process.env.JWT_SECRET || 'YOUR_SECRET_KEY';

export const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user._id,
      telegramId: user.telegramId,
      username: user.username,
      role: user.role, // Включаем роль в токен
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
