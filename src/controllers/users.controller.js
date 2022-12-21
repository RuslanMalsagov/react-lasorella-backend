const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { tokenServise } = require('../service/token-service');
const userDTO = require('../constructor/userDTO');
const { validationResult } = require('express-validator');

module.exports.usersController = {
  registerUser: async (req, res) => {
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        res.status(401).json({ error: 'Некорректные данные' });
      }

      const { login, password, email } = req.body;

      // Валидация
      if (!/[^\s]/gim.test(login)) {
        return res.status(401).json({ error: '* Все поля должны быть заполнены!' });
      }
      if (!/[^\s]/gim.test(email)) {
        return res.status(401).json({ error: '* Все поля должны быть заполнены!' });
      }

      // Проверяем на совпадение логин
      const verificationLogin = await User.findOne({ login });
      if (verificationLogin) {
        return res.status(401).json({ error: '* Этот логин уже занят' });
      }
      // Проверяем на совпадение почту
      const verificationEmail = await User.findOne({ email });
      if (verificationEmail) {
        return res.status(401).json({ error: '* Почта уже используется' });
      }

      // Хэшируем пароль
      const hash = await bcrypt.hash(password, 3);

      const user = await User.create({
        login,
        email,
        password: hash,
      });

      // Удаляем лишние поля из объекта
      const userData = new userDTO(user);

      // Генерируем токены
      const tokens = tokenServise.generateToken({ ...userData });

      // Сохраняем токены
      await tokenServise.saveToken(userData.id, tokens.refreshToken);

      // Сохраняем куки
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      // Возвращаем токены и инфу о пользователе
      res.json({
        ...tokens,
        userData,
      });
    } catch (error) {
      console.log('Ошибка в registerUser', error);
    }
  },
  login: async (req, res) => {
    try {
      const { login, password, email } = req.body;
      const user = await User.findOne({ login });
      if (!user) {
        return res.status(401).json({ error: '* Пользователь не найден' });
      }
      if (user.email !== email) {
        return res.status(401).json({ error: '* Неправильная почта' });
      }
      const isPasswordEquals = await bcrypt.compare(password, user.password);
      if (!isPasswordEquals) {
        return res.status(401).json({ error: '* Неверный пароль' });
      }
      // Выбрасываем лишнее из объекта
      const userData = new userDTO(user);

      // Генерируем токены
      const tokens = tokenServise.generateToken({ ...userData });

      // Сохраняем токены
      await tokenServise.saveToken(userData.id, tokens.refreshToken);

      // Сохраняем куки
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      // Возвращаем токены и инфу о пользователе
      res.json({
        ...tokens,
        userData,
      });
    } catch (error) {
      console.log('Ошибка в login', error);
    }
  },
  logout: async (req, res) => {
    try {
      const { refreshToken } = req.cookies;

      // Удаляем токен из базы данных
      const token = tokenServise.removeToken(refreshToken);

      // Удаляем токен из куки файла
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      console.log('Ошибка в logout', error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        console.log('ЗАШЕЛ');
        return res.status(401).json({ error: '* Ошибка' });
      }

      const userData = await tokenServise.validateRefreshToken(refreshToken);

      const tokenData = await tokenServise.findToken(refreshToken);

      if (!userData || !tokenData) {
        return res.status(401).json({ error: '* Ошибка с токеном' });
      }

      const user = await User.findById(userData.id);

      const userDto = new userDTO(user);

      // Генерируем токены
      const tokens = tokenServise.generateToken({ ...userDto });

      // Сохраняем токены
      await tokenServise.saveToken(userDto.id, tokens.refreshToken);

      // Сохраняем куки
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json('ok');
    } catch (error) {
      console.log('Ошибка в refreshToken', error);
    }
  },
  getUsers: async (req, res, next) => {
    try {
    } catch (error) {}
  },
};
