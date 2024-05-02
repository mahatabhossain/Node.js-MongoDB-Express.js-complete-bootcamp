"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const userController_1 = require("../controllers/userController");
const validateToken_1 = require("../middleware/validateToken");
const validatePayload_1 = require("../middleware/validatePayload");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
router.get('/get', validateToken_1.verifyToken, userController_1.getUser);
router.post('/signup', validatePayload_1.validateSignupDataWithJoi, userController_1.singUp);
router.post('/signin', userController_1.signIn);
router.post('/refresh/token', userController_1.refreshTokenGenerator);
router.post('/logout', userController_1.logOut);
//# sourceMappingURL=userRouter.js.map