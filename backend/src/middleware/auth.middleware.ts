import { NextFunction, Request, Response } from "express";
import { ApiError } from "../common/utils/ApiError.js";
import { verifyAccessToken } from "../common/helpers/jwt.helpers.js";
import { JWTPayload } from "../types/index.js";
import { authRepository } from "../modules/auth/auth.repository.js";

export const verifyUser =  async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token) {
            throw new ApiError(401, 'Unauthorize request')
        }
        const decoded = verifyAccessToken(token) as  JWTPayload
        const user = await authRepository.findById(decoded.userId)
        if(!user) {
            throw new ApiError(401, 'Unauthorized access')
        }

        req.userId = user.id
        next()

    } catch (error) {
        next(new ApiError(401, 'Invalid or expored token'))
    }


}