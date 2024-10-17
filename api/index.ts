import cors from 'cors';
import passport from 'passport';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import config from './config';

import auth from './src/routes/auth';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'YOUR_SESSION_SECRET',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', auth);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })

  process.on('exit', () => {
    mongoose.disconnect();
  })
}

run().catch((err) => console.log(err));