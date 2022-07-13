const { checkToken } = require('../helpers/jwt');
const User = require('../models/user');

const InternalServer = require('../errors/Error500');
const Unauthorized = require('../errors/Error401');

function isAuthorized(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    next(new Unauthorized('Авторизуйтесь для доступа'));
    return;
  }

  const token = auth.replace('Bearer ', '');

  try {
    const payload = checkToken(token);
    User.findOne({ email: payload.email })
      .then((user) => {
        if (!user) {
          next(new InternalServer('Что-то пошло не так'));
        }
        req.user = { id: user._id };
        next();
      });
  } catch (err) {
    next(err);
  }
}

module.exports = { isAuthorized };
