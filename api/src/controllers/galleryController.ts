import { Request, Response } from "express";
import {prisma} from "../../prisma/prisma-client";
import {Photo} from "@prisma/client";
import {RequestWithUser} from "../middleware/authMiddleware";

export const getGallery = async (req: Request, res: Response) => {
  try {
    let gallery: Photo[] = [];
    if (req.query.author) {
      const author: string = req.query.author.toString();
      gallery = await prisma.photo.findMany(
        {
          where: { authorId: { in: [author] } },
          include: { author: true }
        }
      );
    } else {
      gallery = await prisma.photo.findMany({ include: { author: true } });
    }

    res.send(gallery);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const submitNewPhoto = async (expressReq: Request, res: Response) => {
  try {
    const req = expressReq as RequestWithUser;
    const { title, description, category } = req.body;
    const { id: authorId } = req.user;

    const newPhoto = await prisma.photo.create({
      data: {
        title,
        description,
        image: req.file ? req.file.filename : null,
        author: {
          connect: { id: authorId }
        },
        category: {
          connect: { id: category }
        }
      }
    });
    res.send(newPhoto);
  } catch (err) {
    console.log(err);
  }
}