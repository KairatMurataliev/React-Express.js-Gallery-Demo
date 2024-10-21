import { Request, Response } from "express";
import {prisma} from "../../prisma/prisma-client";
import {Photo, User} from "@prisma/client";
import {RequestWithUser} from "../../types";

export const getGallery = async (req: Request, res: Response) => {
  try {
    let gallery: Photo[] = [];
    if (req.query.author) {
      const author: string = req.query.author.toString();
      gallery = await prisma.photo.findMany(
        {
          where: { authorId: { in: [author] }, deleted: false, published: true },
          include: { author: true }
        }
      );
    } else {
      gallery = await prisma.photo.findMany({ where: { deleted: false }, include: { author: true } });
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

export const removeMyPhoto = async (expressReq: Request, res: Response) => {
  try {
    const req = expressReq as RequestWithUser;
    const { id } = req.params;

    await prisma.photo.update({
      where: { id },
      data: { deleted: true }
    })
    res.status(200).send({ message: 'Successfully removed' })
  } catch (err) {
    console.log(err);
  }
}

export const publishPhoto = async (expressReq: Request, res: Response) => {
  try {
    const req = expressReq as RequestWithUser;
    const { id } = req.params;

    await prisma.photo.update({
      where: { id },
      data: { published: true }
    })
    res.status(200).send({ message: 'Successfully published' })
  } catch (err) {
    console.log(err);
  }
}