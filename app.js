// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const mongoose = require('mongoose');
// eslint-disable-next-line no-undef
const usersRoutes = require('./routes/users');
// eslint-disable-next-line no-undef
const cardsRoutes = require('./routes/cards');

const app = express();

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mydb');
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62b2a93093406ee161dd501d',
  };
  next();
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});