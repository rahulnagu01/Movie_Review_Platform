const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true }, // hashed
  profilePicture: String,
  joinDate: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
