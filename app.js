const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { ERROR_CODE_404 } = require('./constants/constants');
const { login, createUser } = require('./controllers/users');
const { isAuthorized } = require('./middlewares/isAuthorized');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', isAuthorized, usersRoutes);
app.use('/cards', isAuthorized, cardsRoutes);
app.use((req, res, next) => {
  res
    .status(ERROR_CODE_404)
    .send('Некорректные данные');
  next();
});

app.use((err, req, res, next) => {
  res
    .status(err.statusCode)
    .send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
