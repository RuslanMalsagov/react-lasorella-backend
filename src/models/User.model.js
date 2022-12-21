const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'USER' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
