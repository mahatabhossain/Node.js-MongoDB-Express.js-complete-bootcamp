import { singUp, signIn, refreshTokenGenerator, logOut, getUser } from '../controllers/userController';
import { verifyToken } from '../middleware/validateToken';
import { validateSignupDataWithJoi } from '../middleware/validatePayload';
import express from 'express'

const router = express.Router()

router.get('/get', verifyToken, getUser);
router.post('/signup', validateSignupDataWithJoi, singUp);
router.post('/signin', signIn);
router.post('/refresh/token', refreshTokenGenerator);
router.post('/logout', logOut);

export { router };
