import {Request, Response} from "express";
import {RequestWithUser} from "../../types";
import {prisma} from "../../prisma/prisma-client";

export const toggleFavourite = async (expressReq: Request, res: Response) => {
  try {
    const req = expressReq as RequestWithUser;
    const {id} = req.params;

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      res.status(400).send({ message: 'User not found' })
    } else {

      const index = user.favourites.findIndex(i => i === id);

      if (index !== -1) {
        user.favourites.splice(index, 1);
      } else {
        user.favourites.push(id);
      }

      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: { favourites: user.favourites }
      });

      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(500).send({message: 'Server Error'});
  }
}