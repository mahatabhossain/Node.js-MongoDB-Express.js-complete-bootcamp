import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let isTokenVerified
    const { authorization } = req.headers;
    if (authorization !== undefined) {
      isTokenVerified = jwt.verify(authorization.split(' ')[1], "asdf");
    }
    if (!isTokenVerified) return res.status(500).json({ issError: true, msg: 'access token not verified' })
    console.log('token verified')
    next()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ isError: true, msg: 'tonken not verified' })
  }
};
