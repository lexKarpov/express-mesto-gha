const { checkToken } = require('../helpers/jwt');
const User = require('../models/user');
const {
  ERROR_CODE_500,
  ERROR_CODE_401,
} = require('../constants/constants');

function isAuthorized(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    const error = new Error('Некорректные данные');
    error.statusCode = ERROR_CODE_401;
    next(error);
  }

  const token = auth.replace('Bearer ', '');

  try {
    const payload = checkToken(token);
    User.findOne({ email: payload.email })
      .then((user) => {
        if (!user) {
          const error = new Error('Что-то пошло не так');
          error.statusCode = ERROR_CODE_500;
          next(error);
        }
        req.user = { id: user._id };
        next();
      });
  } catch (err) {
    const error = new Error('Авторизуйтесь для доступа');
    error.statusCode = ERROR_CODE_401;
    next(error);
  }
}

module.exports = { isAuthorized };
