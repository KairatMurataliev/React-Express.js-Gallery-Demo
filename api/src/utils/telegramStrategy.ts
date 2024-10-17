import passport from 'passport';
import { TelegramStrategy } from 'passport-telegram-official';
import User, { IUser } from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new TelegramStrategy({
  botToken: process.env.TELEGRAM_BOT_TOKEN as string,
}, async (profile: any, done: Function) => {
  try {
    // Ищем пользователя по Telegram ID
    let user = await User.findOne({ telegramId: profile.id });

    // Если пользователя нет, создаем его с ролью user
    if (!user) {
      user = new User({
        telegramId: profile.id,
        username: profile.username,
        firstName: profile.first_name,
        lastName: profile.last_name,
        role: 'user', // Новые пользователи получают роль 'user'
      });
      await user.save();
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
