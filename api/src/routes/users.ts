import express from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt';
import { permit } from '../utils/permit';
import {prisma} from "../../prisma/prisma-client";
import {imagesUpload} from "../utils/multer"; // Импортируем middleware для проверки ролей

const router = express.Router();

// router.get('/admin', passport.authenticate('jwt', { session: false }), permit('admin'), (req: Request, res: Response) => {
//   res.json({ message: 'Welcome admin!' });
// });
//
// router.get('/user', passport.authenticate('jwt', { session: false }), permit('user', 'admin'), (req: Request, res: Response) => {
//   res.json({ message: 'Welcome user!' });
// });

router.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    // const user = await prisma.user.create({
    //   email: req.body.email,
    //   username: req.body.displayName,
    //   avatar: req.file ? req.file.filename : null,
    //   password: req.body.password,
    // });
    //
    // return res.send({message: 'Registered successfully!', user});
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.status(400).send(error);
    // }

    return next(error);
  }
});

// router.post('/login', async (req, res, next) => {
//   try {
//     const user = await prisma.user.findFirst({where: {email: req.body.email}});
//
//     if (!user) return res.status(400).send({error: 'Username or password incorrect'});
//
//     // const isMatch = await user.checkPassword(req.body.password);
//     // if (!isMatch) return res.status(400).send({error: 'Username or password incorrect'});
//   } catch (err) {
//     console.log(err);
//   }
// })


export default router;
