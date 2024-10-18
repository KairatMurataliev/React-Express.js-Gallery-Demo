import { Router, Request, Response } from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt';
import { permit } from '../utils/permit';
import {prisma} from "../../prisma/prisma-client"; // Импортируем middleware для проверки ролей

const router = Router();

// router.get('/admin', passport.authenticate('jwt', { session: false }), permit('admin'), (req: Request, res: Response) => {
//   res.json({ message: 'Welcome admin!' });
// });
//
// router.get('/user', passport.authenticate('jwt', { session: false }), permit('user', 'admin'), (req: Request, res: Response) => {
//   res.json({ message: 'Welcome user!' });
// });

router.get('/', async (req, res, next) => {
  try {
    const allGallery = await prisma.photo.findMany();
    console.log(allGallery);
  } catch (err) {
    console.log(err);
  }
})


export default router;
