import {Request, Response} from 'express';
import {prisma} from "../../prisma/prisma-client";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await prisma.category.findMany();
    res.send(allCategories);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}