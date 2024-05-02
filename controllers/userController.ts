import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { userModel } from "../models/userModel.js"
import { refreshTokenModel } from "../models/refershTokenModel"
import { Request, Response } from "express";
import { TokenDetails, User } from "../interface/users";

const secret = "asdf";

export const getUser = async (req:Request, res:Response) => {
  try{
    const userDetails: User | User[]  = await userModel.find({}, {"__v": 0})
    return res.status(200).json({ status: "success", userDetails, isError: false });

  }catch(e:any){
    return res.status(500).json({ status: "failed", message: e.message, isError: true });
  }
}

export const singUp = async (req:Request, res:Response) => {
  try {
    console.log(req.body)
    const { userName, password , email} = req.body;

    if (!(userName && email)) return res.status(500).json({ status: "enter valid creds" });
    
    const user = await userModel.findOne({ email: email })
    if (user) {
        return res.status(401).json({ status: "User already exists" });
    }
     
    const salt = await bcrypt.genSalt(10);
    const hasPwd = await bcrypt.hash(password, salt);
    
    const userDetails = await userModel({ userName, email, password: hasPwd }).save()
    
    return res.status(201).json({ status: "success", userDetails, isError: false });

  } catch (e:any) {
    console.log(e);
    return res.status(500).json({ status: "failed", message: e.message, isError: true });
  }
};

export const signIn = async (req:Request, res:Response) => {
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
  }catch(e:any){
    console.log(e)
    res.status(500).json({isError: true, msg: 'sign in failed', err: e.message})
  }
};

const generateToken = async (payload: any) => {
  try {
    const accessToken = jwt.sign(payload, secret, {expiresIn: "30m"});
    const refreshToken = jwt.sign(payload, secret, {expiresIn: "1h"});

    const tokenExist = await refreshTokenModel.findOne({userId: payload._id})

    if(tokenExist) {
      await refreshTokenModel.deleteMany({userId: tokenExist.userId})
    }
  
    await refreshTokenModel({userId: payload._id, refreshToken: refreshToken }).save();

    return {accessToken, refreshToken};

  } catch (e:any) {
    console.log(e);
    return { isError: true, msg: 'failed to generate token', err: e.message}
  }
};

const verifyRefreshToken = async (refToken:string) => {
  try{
    const tokenDetails = await refreshTokenModel.findOne({refreshToken: refToken})
    
    if(!tokenDetails) return {isError: true, msg: 'invalid token'}

    const verifiedToken = jwt.verify(refToken, secret)

    return {isError: false, verifiedToken}

  }catch(e:any){
    console.log(e)
    return {isError: true, msg: 'token is not verified', err: e.message}
  }
}

export const refreshTokenGenerator = async (req:Request, res:Response) => {
  try {
    const { refreshToken } = req.body;

    const tokenDetails: TokenDetails = await verifyRefreshToken(refreshToken)
    
    if(!tokenDetails.isError) return res.status(500).json({isError: true, msg: 'token expired'})

    const token = jwt.sign({ userId: tokenDetails.verifiedToken?.userId }, secret, { expiresIn: "20s" });

    return res.status(200).json({ isError: false, msg: 'access token createed', token });
  } catch (e:any) {
    console.log(e);
    return res.status(500).json({ isError: true, msg: 'failed to create access token', err: e.message});
  }
};


export const logOut = async (req:Request, res:Response) => {
  try{
    const { refreshToken } = req.body

    const tokenDetails = await refreshTokenModel.findOne({refreshToken})

    if(!tokenDetails) return res.status(200).json({ status: 'success', isError: false, msg: 'logged out successfully'})
    
    if(tokenDetails) {
      await refreshTokenModel.deleteMany({userId: tokenDetails.userId})
    }

    return res.status(200).json({ status: 'success', isError: false, msg: 'user logged out successfully'})
  }catch(e:any){
    console.log(e)
    return res.status(500).json({isError: true, msg: 'failed to logout'})
  }
}