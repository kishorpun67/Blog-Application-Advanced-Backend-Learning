import { Request, Response, NextFunction } from "express"; // 1. Added NextFunction here
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { authService } from "./auth.service.js";
import { UserResponseDto } from "./auth.response.js";

export const registerUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  
    const user = await authService.registerUser(req.body);
    return res.status(201)
        .cookie("accessToken", user.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })
        .json({
            status: 'success',
            message: 'User Register Successfully',
            data: user
        });
});


export const  loginUserController = asyncHandler(async(req:Request, res:Response)=>{

    const user = await authService.loginUser(req.body)
    return res.status(201)
    .cookie("accessToken", user.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })
    .json({
        status: 'success',
        message: 'User Login Successfully',
        data: user
    });
})

export const refreshTokenController = asyncHandler(async(req:Request, res:Response)=>{
    // return res.send(req.body + 'helo')

    const result = await authService.refreshToken(req.body)
    return res.status(201).json({
        status:"success",
        data:result,
        message:"Token refresh Token successfully"
    })
})


export const currentUserController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await authService.currentUser(req?.userId as String)
    return res.status(201).json({
        status:"success",
        data:result,
        message:"Current user data has been fetched successfully"
    })
})

export const logoutController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await authService.loginUser(req.body.refreshToken)
    return res.status(201).cookie("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    }).
    json({
        status:"success",
        data:result,
        message:"Logout Successfully!"
    })
})

export const logoutAllController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await authService.logoutAll(req?.userId as String)
    return res.status(201).cookie("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    }).
    json({
        status:"success",
        data:result,
        message:"Logout Successfully!"
    })
})