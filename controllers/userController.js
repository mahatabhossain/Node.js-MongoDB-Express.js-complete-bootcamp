const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");
const { refreshTokenModel } = require("../models/refershTokenModel");
const secret = "asdf";

exports.getUser = async (req, res) => {
  try{
    const userDetails = await userModel.find()
    console.log(userDetails)
    res.send(userDetails)
  }catch(e){
    console.log(e.message)
  }
}

exports.singUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!(userName && email)) return res.status(500).json({ status: "enter valid creds" });
    
    const salt = await bcrypt.genSalt(10);
    const hasPwd = await bcrypt.hash(password, salt);
    
    const userDetails = await userModel({ userName, email, password: hasPwd }).save()
    
    return res.status(201).json({ status: "success", userDetails, isError: false });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: "failed", message: e.message, isError: true });
  }
};

exports.signIn = async (req, res) => {
  try{
    const { email, password }= req.body
    
    if(!(email && password )) throw new Error('creds not found')

    if(email) {
      const userDetails = await userModel.findOne({email: email})
      const isPassMatched = await bcrypt.compare(password, userDetails.password)

      if(isPassMatched){
        const tokens = await generateToken({_id: userDetails._id.toString()})
        return res.status(200).json({isError: false, msg: 'sign in successfull', tokens})
      }
    }
  }catch(e){
    console.log(e)
    res.status(500).json({isError: true, msg: 'sign in failed', err: e.message})
  }
};

const generateToken = async (payload) => {
  try {
    const accessToken = jwt.sign(payload, secret, {expiresIn: "30m"});
    const refreshToken = jwt.sign(payload, secret, {expiresIn: "1h"});

    const tokenExist = await refreshTokenModel.findOne({userId: payload._id})

    if(tokenExist) {
      await refreshTokenModel.deleteMany({userId: tokenExist.userId})
    }
  
    await refreshTokenModel({userId: payload._id, refreshToken: refreshToken }).save();

    return {accessToken, refreshToken};

  } catch (e) {
    console.log(e);
    return { isError: true, msg: 'failed to generate token', err: e.message}
  }
};

const verifyRefreshToken = async (refToken) => {
  try{
    const tokenDetails = await refreshTokenModel.findOne({refreshToken: refToken})
    
    if(!tokenDetails) return {isError: true, msg: 'invalid token'}

    const verifiedToken = jwt.verify(refToken, secret)

    return {isError: false, verifiedToken}

  }catch(e){
    console.log(e)
    return {isError: true, msg: 'token is not verified', err: e.message}
  }
}

exports.refreshTokenGenerator = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const tokenDetails = await verifyRefreshToken(refreshToken)
    
    if(!tokenDetails.isError) return res.status(500).json({isError: true, msg: 'token expired'})

    const token = jwt.sign({ userId: tokenDetails.verifiedToken?.userId }, secret, { expiresIn: "20s" });

    return res.status(200).json({ isError: false, msg: 'access token createed', token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ isError: true, msg: 'failed to create access token', err: e.message});
  }
};


exports.logOut = async (req, res) => {
  try{
    const { refreshToken } = req.body

    const tokenDetails = await refreshTokenModel.findOne({refreshToken})

    if(!tokenDetails) return res.status(200).json({ status: 'success', isError: false, msg: 'logged out successfully'})
    
    if(tokenDetails) {
      await refreshTokenModel.deleteMany({userId: tokenDetails.userId})
    }

    return res.status(200).json({ status: 'success', isError: false, msg: 'user logged out successfully'})
  }catch(e){
    console.log(e)
    return res.status(500).json({isError: true, msg: 'failed to logout'})
  }
}