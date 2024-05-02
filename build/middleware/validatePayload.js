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
exports.validateSignUpData = exports.validateSignupDataWithJoi = void 0;
const express_validator_1 = require("express-validator");
const userModel_1 = require("../models/userModel");
const joi_1 = __importDefault(require("joi"));
const validateSchema = joi_1.default.object({
    userName: joi_1.default.string().alphanum().min(3).max(12).required(),
    email: joi_1.default.string().email().trim().required(),
    password: joi_1.default.string().trim().min(3).max(6).required()
});
const validateSignupDataWithJoi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = validateSchema.validate(req.body);
        if (value.error) {
            return res.status(500).json({ isError: true, msg: 'User already exists' });
        }
        req.body = value.value;
        next();
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ isError: true, msg: 'failed to validate body data' });
    }
});
exports.validateSignupDataWithJoi = validateSignupDataWithJoi;
const validateSignUpData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('validatig data...');
        (0, express_validator_1.body)('userName').notEmpty().isString().isAlphanumeric().trim();
        (0, express_validator_1.body)('email').notEmpty().isString().trim().isEmail().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield userModel_1.userModel.find({ email: value });
            if (user)
                throw new Error('email already exists');
        })).withMessage('Not a valid e-mail address');
        (0, express_validator_1.body)('password').notEmpty().isString().trim().isLength({ min: 3, max: 12 });
        next();
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ isError: true, msg: 'failed to validate body data' });
    }
});
exports.validateSignUpData = validateSignUpData;
//# sourceMappingURL=validatePayload.js.map