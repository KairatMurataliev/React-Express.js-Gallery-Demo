import { Request, Response } from "express";
import {prisma} from "../../prisma/prisma-client";

export const getGallery = async (req: Request, res: Response) => {
  try {
    const allGallery = await prisma.photo.findMany(
      { include: { author: true } }
    );
    res.send(allGallery);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}