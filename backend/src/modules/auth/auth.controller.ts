import { Request, Response, NextFunction } from "express"; // 1. Added NextFunction here
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { authService } from "./auth.container.js";
import { NODE_ENV } from "../../config/config.js";

export const registerUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await authService.registerUser(req.body);
    setCookies(res, user.accessToken, user.refreshToken)
    return res.status(201)
        .json({
            success:true,
            message: 'User Register Successfully',
            data: user
        });
});


export const  loginUserController = asyncHandler(async(req:Request, res:Response)=>{
    const user = await authService.loginUser(req.body)
    setCookies(res, user.accessToken, user.refreshToken)
    return res.status(200)
    .json({
        success:true,
        message: 'User Login Successfully',
        data: user
    });
})

export const refreshTokenController = asyncHandler(async(req:Request, res:Response)=>{
    const user = await authService.refreshToken(req.body)
    setCookies(res, user.accessToken, user.refreshToken)
    return res.status(200).json({
        status:"success",
        data:user,
        message:"Token refresh Token successfully"
    })
})


export const currentUserController = asyncHandler(async(req:Request, res:Response)=>{
    const user = await authService.currentUser(req.userId! as string)
    return res.status(200).json({
        status:"success",
        data:user,
        message:"Current user data has been fetched successfully"
    })
})

export const logoutController = asyncHandler(async(req:Request, res:Response)=>{
    const user = await authService.logout(req.body.refreshToken)
    destroyCookies(res)
    return res.status(200).
    json({
        status:"success",
        data:user,
        message:"Logout Successfully!"
    })
})

export const logoutAllController = asyncHandler(async(req:Request, res:Response)=>{
    const user = await authService.logoutAll(req.userId! as string)
    destroyCookies(res)
    return res.status(200).
    json({
        status:"success",
        data:user,
        message:"Logout Successfully!"
    })
})

const cookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict" as const,
};

export const setCookies = (
    res:Response,
    accessToken:string,
    refreshToken:string
)=>{
    res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge:30 * 24 * 60 * 60 * 1000

    } )
    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge:30 * 24 * 60 * 60 * 1000
    })
}

export const destroyCookies = (
    res:Response,
)=>{
    res.clearCookie("accessToken", {       
        ...cookieOptions,
    } )
    res.clearCookie("refreshToken", {
        ...cookieOptions,
    })
}