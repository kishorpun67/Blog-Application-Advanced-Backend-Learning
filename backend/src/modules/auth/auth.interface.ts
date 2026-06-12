import { RefreshToken, User } from "@prisma/client";
import { RegisterUserData } from "./auth.dto.js"


export interface IAuthRepository {
<<<<<<< HEAD
    findById(id:string):Promise<any>
    findByEmail(email:string):Promise<any>
    createUser(data:RegisterUserData):Promise<any>
    createRefreshToken( data: object):Promise<any>
    findRefreshToken(token:string):Promise<any>
    findRefreshTokenById(userId:string):Promise<any>
    deleteRefreshTokenByUserId(userId:string):Promise<any>
    deleteRefreshTokenById(id:string):Promise<any>
    deleteRefreshTokenByToken(token:string):Promise<any>
=======
    findById(id:string):Promise<User | null>
    findByEmail(email:string):Promise<User | null>
    createUser(data:RegisterUserData):Promise<User>
    createRefreshToken( data: object):Promise<RefreshToken>
    findRefreshToken(token:string):Promise<RefreshToken | null>
    findRefreshTokenById(userId:string):Promise<RefreshToken | null>
    deleteRefreshTokenByUserId(userId:string):Promise<void>
    deleteRefreshTokenById(id:string):Promise<void>
    deleteRefreshTokenByToken(token:string):Promise<void>
>>>>>>> f3915a3 (last commit)

}   