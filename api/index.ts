import cors from 'cors';
import passport from 'passport';
import express from 'express';
import session from 'express-session';

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
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
}

run().catch((err) => console.log(err));