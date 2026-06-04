import { prisma } from "../../lib/prisma.js";
import { RegisterUserData } from "./auth.dto.js";
import { IAuthRepository } from "./auth.interface.js";

export class AuthRepository implements IAuthRepository{
    async findByEmail(email:string) {
        return await prisma.user.findUnique({
            where:{
                email
            }
        })
    }
    async  findById(id:string)  {
        return await prisma.user.findUnique({
            where:{
                id
            }
        })
    }
    async createUser(data:RegisterUserData){
        return await prisma.user.create({
            data,
        })
    }

    async createRefreshToken(data: {
        token:string,
        userId:string,
        expiresAt:string
    }) {
        return await prisma.refreshToken.create({
            data: {
                userId: data.userId,
                token: data.token,
                expiresAt: data.expiresAt
            }
           
        })
    }

    async findRefreshToken(token:string){
        return await prisma.refreshToken.findUnique({
            where:{
                token,
            }
        })
    }

    async findRefreshTokenById(userId:string) {
        return await prisma.refreshToken.findMany({
            where:{
                userId
            }
        })
    }
    async deleteRefreshTokenByUserId(userId:string) {
        return await prisma.refreshToken.deleteMany({
            where:{
                userId
            }
        })
    }
    async deleteRefreshTokenById(id:string){
        return await prisma.refreshToken.delete({
            where:{
                id
            }
        })
    }
    async deleteRefreshTokenByToken(token:string) {
        return await prisma.refreshToken.delete({
            where:{
                token
            }
        })
    }
}






