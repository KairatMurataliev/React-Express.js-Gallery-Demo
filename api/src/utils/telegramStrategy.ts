import passport from 'passport';
import { TelegramStrategy } from 'passport-telegram-official';
import User from '../models/user.model';
import { generateToken } from './jwt';

passport.use(new TelegramStrategy({
  botToken: '8107383355:AAHOoh4Yv7-Jj0krU_yACpN1lf7SHG_Qeqs', // Здесь нужно вставить токен вашего Telegram-бота
}, async (profile: any, done: any) => {
  try {
    // Поиск пользователя в базе данных
    let user = await User.findOne({ telegramId: profile.id });

    // Если пользователя нет, создаем его
    if (!user) {
      user = new User({
        telegramId: profile.id,
        username: profile.username,
        firstName: profile.first_name,
        lastName: profile.last_name,
      });
      await user.save();
    }

    // Генерация JWT
    const token = generateToken(user);
    user.token = token; // Сохраняем токен в базе данных, если нужно
    await user.save();

    // Возвращаем пользователя и токен
    done(null, { user, token });
  } catch (error) {
    done(error, false);
  }
}));
