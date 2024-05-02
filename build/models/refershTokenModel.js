"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenModel = void 0;
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
exports.refreshTokenModel = refreshTokenModel;
//# sourceMappingURL=refershTokenModel.js.map