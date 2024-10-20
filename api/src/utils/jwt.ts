import jwt from 'jsonwebtoken';
import {User} from "@prisma/client"; // Импортируем наш тип

export const generateToken = (user: User) => {
  return jwt.sign(
    {...user},
    process.env.JWT_SECRET as string,
    { expiresIn: '20m' }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
