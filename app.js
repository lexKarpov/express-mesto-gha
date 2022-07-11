const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { ERROR_CODE_404 } = require('./constants/constants');
const { login, createUser } = require('./controllers/users');
const { isAuthorized } = require('./middlewares/isAuthorized');
const { regExpAvatar } = require('./constants/constants');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required()
      .min(2),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30),
    about: Joi
      .string()
      .min(2)
      .max(30),
    avatar: Joi
      .string()
      .pattern(new RegExp(regExpAvatar)),
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required()
      .min(2),
  }),
}), createUser);

app.use('/users', isAuthorized, usersRoutes);
app.use('/cards', isAuthorized, cardsRoutes);

app.use((req, res, next) => {
  const error = new Error('Данный Некорректные уже занят.');
  error.statusCode = ERROR_CODE_404;
  next(error);
});
app.use(errors());
app.use((err, req, res, next) => {
  res
    .status(err.statusCode)
    .send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
