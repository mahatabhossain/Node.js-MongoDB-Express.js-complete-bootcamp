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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isTokenVerified;
        const { authorization } = req.headers;
        if (authorization !== undefined) {
            isTokenVerified = jsonwebtoken_1.default.verify(authorization.split(' ')[1], "asdf");
        }
        if (!isTokenVerified)
            return res.status(500).json({ issError: true, msg: 'access token not verified' });
        console.log('token verified');
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ isError: true, msg: 'tonken not verified' });
    }
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=validateToken.js.map