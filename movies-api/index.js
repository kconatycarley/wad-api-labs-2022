import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import authenticate from './authenticate';
import './db';
app.use(express.json());
import moviesRouter from './api/movies';
import './seedData'
import usersRouter from './api/users';
app.use('/api/users', usersRouter);



dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();

const port = process.env.PORT;


app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
})); 

app.use('/api/movies', moviesRouter);
app.use(errHandler);



app.use('/api/movies', authenticate, moviesRouter);


app.listen(port, () => {
  console.info(`Server running at ${port}`);
});