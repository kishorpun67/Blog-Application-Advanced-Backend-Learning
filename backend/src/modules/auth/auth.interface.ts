import { RefreshToken, User } from "@prisma/client";
import { RegisterUserData } from "./auth.dto.js"


export interface IAuthRepository {
    findById(id:string):Promise<User | null>
    findByEmail(email:string):Promise<User | null>
    createUser(data:RegisterUserData):Promise<User>
    createRefreshToken( data: object):Promise<RefreshToken>
    findRefreshToken(token:string):Promise<RefreshToken | null>
    findRefreshTokenById(userId:string):Promise<RefreshToken | null>
    deleteRefreshTokenByUserId(userId:string):Promise<void>
    deleteRefreshTokenById(id:string):Promise<void>
    deleteRefreshTokenByToken(token:string):Promise<void>

}   