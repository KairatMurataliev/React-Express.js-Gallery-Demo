import {Request, Response} from "express";
import {prisma} from "../../prisma/prisma-client";
import {Photo, User} from "@prisma/client";
import {RequestWithUser} from "../../types";

type Query = {
  authorId?: { in: string[] };
  categoryId?: { in: string[] };
  published: boolean;
  deleted: boolean,
}

export const getGallery = async (req: Request, res: Response) => {
  try {
    const query: Query = {
      deleted: false,
      published: true,
    };

    if (req.query.author) {
      const author: string = req.query.author.toString();
      query.authorId = { in: [ author ] }
    }

    if (req.query.category) {
      const category: string = req.query.category.toString();
      query.categoryId = { in: [category] }
    }

    const gallery = await prisma.photo.findMany({ where: query, include: { author: true } });
    res.send(gallery);
  } catch (err) {
    res.status(500).json({error: 'Server error'});
  }
}

export const submitNewPhoto = async (expressReq: Request, res: Response) => {
  try {
    const req = expressReq as RequestWithUser;
    const {title, description, category} = req.body;
    const {id: authorId} = req.user;

    const newPhoto = await prisma.photo.create({
      data: {
        title,
        description,
        image: req.file ? req.file.filename : null,
        author: {
          connect: {id: authorId}
        },
        category: {
          connect: {id: category}
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
    const {id} = req.params;

    await prisma.photo.update({
      where: {id},
      data: {deleted: true}
    })
    res.status(200).send({message: 'Successfully removed'})
  } catch (err) {
    console.log(err);
  }
}

export const publishPhoto = async (expressReq: Request, res: Response) => {
  try {
    const req = expressReq as RequestWithUser;
    const {id} = req.params;

    await prisma.photo.update({
      where: {id},
      data: {published: true}
    })
    res.status(200).send({message: 'Successfully published'})
  } catch (err) {
    res.status(500).send({message: 'Server Error'});
  }
}

export const getAdminGallery = async (req: Request, res: Response) => {
  try {
    console.log(req.query);
  } catch (err) {
    console.log(err);
  }
}