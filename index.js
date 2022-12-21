const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./src/routes');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

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
