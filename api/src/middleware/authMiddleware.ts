import {NextFunction, Request, Response} from 'express';
import {prisma} from "../../prisma/prisma-client";
import {RequestWithUser} from "../../types";

export const authMiddleware = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as RequestWithUser;
  const token = req.get('Authorization');

  if (!token) {
    res.status(401).send({error: 'No token'});
  } else {
    const user = await prisma.user.findFirst({ where: { token } });

    if (!user) {
      res.status(401).send({error: 'Wrong token!'});
    } else {
      req.user = user;

      next();
    }
  }
};