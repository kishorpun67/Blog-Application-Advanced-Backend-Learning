import { Request, Response, NextFunction } from "express"; // 1. Added NextFunction here
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { registerUser } from "./auth.service.js";

export const registerUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Calls the functional backend service directly
    const user = await registerUser(req.body);
    
    return res.status(201)
        .cookie("accessToken", user.token, {
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