import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { userModel } from "../models/userModel";
import Joi, { isError } from "joi";

const validateSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(12).required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().min(3).max(6).required()
})

export const validateSignupDataWithJoi = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = validateSchema.validate(req.body)
        if (value.error) {
            return res.status(500).json({ isError: true, msg: 'User already exists' })
        }
        req.body = value.value
        next()

    } catch (e: any) {
        console.log(e)
        res.status(500).json({ isError: true, msg: 'failed to validate body data' })
    }
}

export const validateSignUpData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('validatig data...')
        body('userName').notEmpty().isString().isAlphanumeric().trim()
        body('email').notEmpty().isString().trim().isEmail().custom(async value => {
            const user = await userModel.find({ email: value })
            if (user) throw new Error('email already exists')
        }).withMessage('Not a valid e-mail address');
        body('password').notEmpty().isString().trim().isLength({ min: 3, max: 12 })

        next()

    } catch (e: any) {
        console.log(e.message)
        res.status(500).json({ isError: true, msg: 'failed to validate body data' })
    }
}