import { Request, Response } from "express";
import {prisma} from "../../prisma/prisma-client";

export const getGallery = async (req: Request, res: Response) => {
  try {
    let gallery = [];
    if (req.query.author) {
      gallery = await prisma.photo.findMany(
        {
          where: { authorId: req.query.author },
          include: { author: true }
        }
      );
    } else {
      gallery = await prisma.photo.findMany(
        { include: { author: true } }
      );
    }

    res.send(gallery);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const submitNewPhoto = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      // const {title, description, categoryId} = req.body;
      // const {id: authorId} = req.user;
      //
      // const newPhoto = await prisma.photo.create({
      //   data: {
      //     title,
      //     description,
      //     categoryId,
      //     image: req.file ? req.file.filename : '',
      //     authorId,
      //   }
      // });
      // res.send(newPhoto);
    }
  } catch (err) {
    console.log(err);
  }
}