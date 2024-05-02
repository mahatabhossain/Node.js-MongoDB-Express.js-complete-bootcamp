const mongoose = require("mongoose");

const refreshTokenSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const refreshTokenModel = mongoose.model("refreshToken", refreshTokenSchema);
export { refreshTokenModel }