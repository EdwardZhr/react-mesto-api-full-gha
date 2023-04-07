const jwt = require('jsonwebtoken');

const UnauthorizeddError = require('../errors/unauthorized-err');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizeddError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizeddError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
