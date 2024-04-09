const { singUp, signIn, refreshTokenGenerator, logOut, getUser } = require("../controllers/userController");
const { verifyToken } = require("../middleware/validateToken");
const router = require("express").Router();

router.get('/get',verifyToken, getUser)
router.post("/signup", singUp);
router.post("/signin", signIn);
router.post("/refresh/token", refreshTokenGenerator);
router.post("/logout", logOut);

module.exports = { router };
