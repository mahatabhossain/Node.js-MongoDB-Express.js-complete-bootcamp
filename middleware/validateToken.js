const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const isTokenVerified = jwt.verify(authorization, "asdf");
    if(!isTokenVerified) return res.status(500).json({issError: true, msg: 'access token not verified'})
    console.log('token verified')
    next()
  } catch (e) {
    console.log(e)
    return res.status(500).json({isError: true, msg: 'tonken not verified'})
  }
};
