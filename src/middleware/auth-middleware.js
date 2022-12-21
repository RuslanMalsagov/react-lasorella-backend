const { tokenServise } = require('../service/token-service');

module.exports = function (req, res, next) {
  try {
    const { authorizationHeader } = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ error: '* Ошибка! Нет хедера!' });
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return res.status(401).json({ error: '* Ошибка! Нет токена!' });
    }

    const userData = tokenServise.validateAccessToken(accessToken);
    if (!userData) {
      return res.status(401).json({ error: '* Ошибка! Нет информации о юзере!' });
    }

    req.user = userData;
    next();
  } catch (error) {
    console.log('Ошибка в мидлеваре');
  }
};
