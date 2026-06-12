import { RefreshToken, User } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { RegisterUserData } from "./auth.dto.js";
import { IAuthRepository } from "./auth.interface.js";

export class AuthRepository implements IAuthRepository{
    async findByEmail(email:string):Promise <User | null> {
        return await prisma.user.findUnique({
            where:{
                email
            }
        })
    }
    async  findById(id:string):Promise<User | null> {
        return await prisma.user.findUnique({
            where:{
                id
            }
        })
    }
    async createUser(data:RegisterUserData):Promise<User>{
        return await prisma.user.create({
            data,
        })
    }

    async createRefreshToken(data: {
        token:string,
        userId:string,
        expiresAt:string
    }):Promise<RefreshToken>{
        return await prisma.refreshToken.create({
            data: {
                userId: data.userId,
                token: data.token,
                expiresAt: data.expiresAt
            }
           
        })
    }

    async findRefreshToken(token:string): Promise <RefreshToken | null>{
        return await prisma.refreshToken.findUnique({
            where:{
                token,
            }
        })
    }

    async findRefreshTokenById(userId:string): Promise <RefreshToken | null> {
        return await prisma.refreshToken.findMany({
            where:{
                userId
            }
        })
    }
    async deleteRefreshTokenByUserId(userId:string): Promise <RefreshToken | null> {
        return await prisma.refreshToken.deleteMany({
            where:{
                userId
            }
        })
    }
    async deleteRefreshTokenById(id:string):Promise<void>{
        return await prisma.refreshToken.delete({
            where:{
                id
            }
        })
    }
    async deleteRefreshTokenByToken(token:string):Promise<void> {
        return await prisma.refreshToken.delete({
            where:{
                token
            }
        })
    }
}






