import { prisma } from "../../lib/prisma.js";
import { RegisterUserData } from "./auth.dto.js";


export const  findByEmail = async(email:RegisterUserData)  =>{
    // console.log(email);
    return await prisma.user.findUnique({
        where:{
            email
        }
    })
}

export const createUser = async(data:RegisterUserData) =>{
    return await prisma.user.create({
        data,
    })
}

// export class AuthRepository {
//     async findByEmail(email:string) {
//         return prisma.user.findUnique({
//             where:{
//                 email
//             },
//         })

//     }
//     async createUser(data: RegisterUserData) {
//         return prisma.user.create({
//           data,
//         });
//     }
// }