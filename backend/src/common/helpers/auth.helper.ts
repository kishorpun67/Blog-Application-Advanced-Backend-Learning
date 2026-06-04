import bcrypt from "bcryptjs";
import crypto from 'crypto'
import { CRYPTO_SECRET } from "../../config/config.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


if(!CRYPTO_SECRET) {
    throw new ApiError(404, 'Crypto secret not found!')
}

export const hashPassword = async(password:string) =>{
    return await bcrypt.hash(password,10)
}

export const comparePassword = async (password:string, dbPassword:string) =>{
    return await bcrypt.compare(password,dbPassword)
}

export const hashRefreshToken = (token: string) => {
    return crypto
        .createHmac("sha256", CRYPTO_SECRET)
        .update(token)
        .digest("hex");
};

