import { Router, Request, Response } from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt';
import { permit } from '../utils/permit'; // Импортируем middleware для проверки ролей

const router = Router();

// Маршрут для аутентификации через Telegram
router.get('/auth/telegram', passport.authenticate('telegram'));

// Callback от Telegram
router.get('/auth/telegram/callback', passport.authenticate('telegram', {
  failureRedirect: '/login',
}), (req: Request, res: Response) => {
  const user = req.user as any;
  const token = generateToken(user);
  res.json({
    message: 'Authenticated successfully',
    token,
  });
});

// Пример защищенного маршрута только для админов
router.get('/admin', passport.authenticate('jwt', { session: false }), permit('admin'), (req: Request, res: Response) => {
  res.json({ message: 'Welcome admin!' });
});

// Пример маршрута для всех пользователей
router.get('/user', passport.authenticate('jwt', { session: false }), permit('user', 'admin'), (req: Request, res: Response) => {
  res.json({ message: 'Welcome user!' });
});

export default router;
