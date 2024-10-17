import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const port = 8000;

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  })

  process.on('exit', () => {
    mongoose.disconnect();
  })
}

run().catch((err) => console.log(err));