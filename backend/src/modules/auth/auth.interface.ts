import { RegisterUserData } from "./auth.dto.js"


export interface IAuthRepository {
    findById(id:string):Promise<any>
    findByEmail(email:string):Promise<any>
    createUser(data:RegisterUserData):Promise<any>
    createRefreshToken( data: object):Promise<any>
    findRefreshToken(token:string):Promise<any>
    findRefreshTokenById(userId:string):Promise<any>
    deleteRefreshTokenByUserId(userId:string):Promise<any>
    deleteRefreshTokenById(id:string):Promise<any>
    deleteRefreshTokenByToken(token:string):Promise<any>


}   