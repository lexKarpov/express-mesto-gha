const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62b98a38fdb0b1cc92fee397',
  };
  next();
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use((err, req, res, next) => {
  res
    .status(err.statusCode)
    .send({ message: err.message });
  next();
});

app.use((req, res, next) => {
  res
    .status(404)
    .send('Некорректные данные');
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
