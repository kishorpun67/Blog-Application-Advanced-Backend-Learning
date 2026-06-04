import jwt, {SignOptions} from "jsonwebtoken"
import { JWT_ACCESS_TOKEN_EXPIRY, JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRY, JWT_REFRESH_TOKEN_SECRET } from "../../config/config.js"
import { ApiError } from "../utils/ApiError.js"


const REFRESH_TOKEN_SECRET =  JWT_REFRESH_TOKEN_SECRET 
const REFRESH_TOKEN_EXPIRY = JWT_REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"]
const ACCESS_TOKEN_SECRET = JWT_ACCESS_TOKEN_SECRET
const ACCESS_TOKEN_EXPIRY = JWT_ACCESS_TOKEN_EXPIRY  as SignOptions["expiresIn"]

export const generateAccessToken = (userId:string) =>{
    return  jwt.sign(
        {
            userId,
        },
        ACCESS_TOKEN_SECRET,
       {expiresIn: ACCESS_TOKEN_EXPIRY}
    ) 
} 

export const generateRefreshToken = (userId:string)=>{
    return  jwt.sign(
        {
            userId,
        },
        REFRESH_TOKEN_SECRET,
       {expiresIn: REFRESH_TOKEN_EXPIRY}
    ) 
}
export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
        throw  new ApiError(400,'Invalid access token')

    }
};

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET); 
    } catch (error) {
        throw  new ApiError(400,'Invalid refresh token')
    }
};



