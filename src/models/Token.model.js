const mongoose = require('mongoose');

const RefreshTokenSchema = mongoose.Schema({
  refreshToken: { type: String, required: true },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
});

const RefreshToken = mongoose.model('Token', RefreshTokenSchema);
module.exports = RefreshToken;
