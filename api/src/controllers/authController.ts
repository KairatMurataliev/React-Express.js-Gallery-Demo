import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import {generateToken, verifyToken} from '../utils/jwt';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(400).json({ error: 'User with this email exists' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: { email, password: hashedPassword, username },
      });

      const token = generateToken(newUser);

      res.status(201).json({ user: {...newUser, token} });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(400).json({ error: 'Incorrect password or email' })
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(400).json({ error: 'Incorrect password or email' });
      } else {
        const token = generateToken(user);

        res.status(200).json({ user: {...user, token} });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ error: 'No token' });
    } else {
      const decoded = verifyToken(token);

      await prisma.tokenBlacklist.create({
        data: {
          token: token,
          expiresAt: new Date(decoded.exp * 1000),
        },
      });

      res.status(200).json({ message: 'Logout successful' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
