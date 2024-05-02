"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.refreshTokenGenerator = exports.signIn = exports.singUp = exports.getUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_js_1 = require("../models/userModel.js");
const refershTokenModel_1 = require("../models/refershTokenModel");
const secret = "asdf";
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDetails = yield userModel_js_1.userModel.find({}, { "__v": 0 });
        return res.status(200).json({ status: "success", userDetails, isError: false });
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message, isError: true });
    }
});
exports.getUser = getUser;
const singUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { userName, password, email } = req.body;
        if (!(userName && email))
            return res.status(500).json({ status: "enter valid creds" });
        const user = yield userModel_js_1.userModel.findOne({ email: email });
        if (user) {
            return res.status(401).json({ status: "User already exists" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hasPwd = yield bcrypt_1.default.hash(password, salt);
        const userDetails = yield (0, userModel_js_1.userModel)({ userName, email, password: hasPwd }).save();
        return res.status(201).json({ status: "success", userDetails, isError: false });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ status: "failed", message: e.message, isError: true });
    }
});
exports.singUp = singUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!(email && password))
            throw new Error('creds not found');
        if (email) {
            const userDetails = yield userModel_js_1.userModel.findOne({ email: email });
            const isPassMatched = yield bcrypt_1.default.compare(password, userDetails.password);
            if (isPassMatched) {
                const tokens = yield generateToken({ _id: userDetails._id.toString() });
                return res.status(200).json({ isError: false, msg: 'sign in successfull', tokens });
            }
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ isError: true, msg: 'sign in failed', err: e.message });
    }
});
exports.signIn = signIn;
const generateToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "30m" });
        const refreshToken = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "1h" });
        const tokenExist = yield refershTokenModel_1.refreshTokenModel.findOne({ userId: payload._id });
        if (tokenExist) {
            yield refershTokenModel_1.refreshTokenModel.deleteMany({ userId: tokenExist.userId });
        }
        yield (0, refershTokenModel_1.refreshTokenModel)({ userId: payload._id, refreshToken: refreshToken }).save();
        return { accessToken, refreshToken };
    }
    catch (e) {
        console.log(e);
        return { isError: true, msg: 'failed to generate token', err: e.message };
    }
});
const verifyRefreshToken = (refToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenDetails = yield refershTokenModel_1.refreshTokenModel.findOne({ refreshToken: refToken });
        if (!tokenDetails)
            return { isError: true, msg: 'invalid token' };
        const verifiedToken = jsonwebtoken_1.default.verify(refToken, secret);
        return { isError: false, verifiedToken };
    }
    catch (e) {
        console.log(e);
        return { isError: true, msg: 'token is not verified', err: e.message };
    }
});
const refreshTokenGenerator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { refreshToken } = req.body;
        const tokenDetails = yield verifyRefreshToken(refreshToken);
        if (!tokenDetails.isError)
            return res.status(500).json({ isError: true, msg: 'token expired' });
        const token = jsonwebtoken_1.default.sign({ userId: (_a = tokenDetails.verifiedToken) === null || _a === void 0 ? void 0 : _a.userId }, secret, { expiresIn: "20s" });
        return res.status(200).json({ isError: false, msg: 'access token createed', token });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ isError: true, msg: 'failed to create access token', err: e.message });
    }
});
exports.refreshTokenGenerator = refreshTokenGenerator;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        const tokenDetails = yield refershTokenModel_1.refreshTokenModel.findOne({ refreshToken });
        if (!tokenDetails)
            return res.status(200).json({ status: 'success', isError: false, msg: 'logged out successfully' });
        if (tokenDetails) {
            yield refershTokenModel_1.refreshTokenModel.deleteMany({ userId: tokenDetails.userId });
        }
        return res.status(200).json({ status: 'success', isError: false, msg: 'user logged out successfully' });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ isError: true, msg: 'failed to logout' });
    }
});
exports.logOut = logOut;
//# sourceMappingURL=userController.js.map