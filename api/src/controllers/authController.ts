import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {PrismaClient, User} from '@prisma/client';
import {generateToken} from "../utils/generateToken";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(400).json({ error: 'User with this email exists' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const token = generateToken();

      const newUser = await prisma.user.create({
        data: { email, password: hashedPassword, username, token },
      });

      res.status(201).json({ user: newUser });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: User | null = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(400).json({ error: 'Incorrect password or email' })
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(400).json({ error: 'Incorrect password or email' });
      } else {
        const token = generateToken();
        const updatedUser: User = await prisma.user.update({
          where: { email },
          data: { token }
        })

        res.status(200).json({ user: updatedUser });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.get('Authorization');
    const success = {message: 'OK'};

    if (!token) {
      res.send(success);
    } else {
      const user: User | null = await prisma.user.findFirst({ where: { token } });

      if (!user) {
        res.send(success);
      } else {
        const updatedUser = await prisma.user.updateMany({
          where: { token },
          data: { token: generateToken() }
        })

        res.status(200).json({ user: updatedUser });
      }
    }


  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
