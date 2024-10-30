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

export const removeCategory = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    console.log(id);

    const photos = await prisma.photo.findMany({ where: { categoryId: id }})

    if (photos.length) {
      res.status(400).send({ message: 'This category contains photos.'})
    } else {
      await prisma.category.update({
        where: {id},
        data: {deleted: true}
      })
      res.status(200).send({ message: 'Successfully removed' });
    }
  } catch (err) {
    console.log(err);
  }
}