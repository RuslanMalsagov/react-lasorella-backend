const jwt = require('jsonwebtoken');
const tokenModel = require('../models/Token.model');

module.exports.tokenServise = {
  generateToken: payload => {
    // Генерируем токены
    const accessToken = jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_JWT_KEY, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  },

  saveToken: async (userId, refreshToken) => {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({
      user: userId,
      refreshToken,
    });
    return token;
  },

  validateAccessToken: token => {
    try {
      const userData = jwt.verify(token, process.env.SECRET_JWT_KEY);
      return userData;
    } catch (error) {
      console.log('ошибка в validateAccessToken');
      return null;
    }
  },

  validateRefreshToken: token => {
    try {
      const userData = jwt.verify(token, process.env.SECRET_REFRESH_JWT_KEY);
      return userData;
    } catch (error) {
      console.log('ошибка в validateRefreshToken');
      return nul;
    }
  },

  findToken: async refreshToken => {
    try {
      const token = await tokenModel.findOne({ refreshToken });
      return token;
    } catch (error) {
      console.log('findToken', error);
    }
  },

  removeToken: async refreshToken => {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  },
};
