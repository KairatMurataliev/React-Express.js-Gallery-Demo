import { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

// Маршрут для авторизации через Telegram
router.get('/auth/telegram/callback', passport.authenticate('telegram'), (req: Request, res: Response) => {
  const user = req.user as { token: string };
  res.json({
    message: 'Authenticated successfully',
    token: user.token
  });
});

export default router;
