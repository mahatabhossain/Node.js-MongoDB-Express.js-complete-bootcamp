const mongoose = require("mongoose");

const refreshTokenSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

const refreshTokenModel = mongoose.model("refreshToken", refreshTokenSchema);
module.exports = { refreshTokenModel }