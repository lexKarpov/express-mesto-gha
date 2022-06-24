const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
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
app.use((err, req, res) => {
  res
    .status(err.statusCode)
    .send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
