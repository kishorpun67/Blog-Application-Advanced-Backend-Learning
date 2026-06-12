import { NextFunction, Request, Response } from "express";
import { ApiError } from "../common/utils/ApiError.js";
import { verifyAccessToken } from "../common/helpers/jwt.helpers.js";
import { JWTPayload } from "../types/index.js";



export const verifyUser =
    async(req:Request, res:Response, next:NextFunction)=>{
        try{
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
            if(!token) {
                throw new ApiError(401, 'Unauthorize request')
            }
            const decoded = verifyAccessToken(token) as  JWTPayload
            req.userId = decoded.userId
            next()
        } catch (error) {
            next(new ApiError(401, 'Invalid or expored token'))
        }
    }







// import { NextFunction, Request, Response } from "express";
// import { ApiError } from "../common/utils/ApiError.js";
// import { verifyAccessToken } from "../common/helpers/jwt.helpers.js";
// import { JWTPayload } from "../types/index.js";
// import { AuthService } from "../modules/auth/auth.service.js";



// export const verifyUser = (authService:AuthService) =>
//     async(req:Request, res:Response, next:NextFunction)=>{
//         try{
//             const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
//             if(!token) {
//                 throw new ApiError(401, 'Unauthorize request')
//             }
//             const decoded = verifyAccessToken(token) as  JWTPayload
//             const result = await authService.currentUser(decoded.userId);
//             req.userId = result.user.id;
//             next()
//         } catch (error) {
//             next(new ApiError(401, 'Invalid or expored token'))
//         }
//     }