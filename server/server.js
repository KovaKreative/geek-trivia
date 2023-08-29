import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import cors from 'cors';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(cookieSession({ name: 'session', keys: [process.env.KEY], maxAge: 365 * 24 * 60 * 60 * 1000 }));
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Geek Trivia app listening on port ${PORT}`);
});