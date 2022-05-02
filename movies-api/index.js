import dotenv from 'dotenv';
import express from 'express';
import './db';
app.use(express.json());
import moviesRouter from './api/movies';
import './seedData'
import usersRouter from './api/users';
app.use('/api/users', usersRouter);

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use('/api/movies', moviesRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});