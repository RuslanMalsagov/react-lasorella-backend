const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

app.use(require('./src/routes'));
app.use(express.json());

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`Сервер успешно запущен http://localhost:${process.env.PORT}`);
    }),
  )
  .catch(() => console.log('Ошибка при соединении с сервером MongoDB'));
