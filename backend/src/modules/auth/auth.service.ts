

// import { AuthRepository } from "./auth.repository.js";
import { RegisterUserData } from "./auth.dto.js";
import { ApiError } from "../../common/utils/ApiError.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../../common/utils/jwt.js";
import { createUser, findByEmail } from "./auth.repository.js";


export const registerUser = async(data:RegisterUserData) =>{

    const existingUser = await findByEmail(data.email)
    if(existingUser) {
        throw  new ApiError(409,'User already existed')
    }

    const hashPassword = await bcrypt.hash(data.password,10)
    const user:any = createUser({...data})

    const accessToken = generateAccessToken({
        userId: user.id,
    });
    
    return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          accessToken:accessToken
        },
    };
}
// export class AuthService {
//     private  authRepository =new AuthRepository()

//     async  registerUser(data:RegisterUserData) {
//         const existingUser = await this.authRepository.findByEmail(data.email)

//         if(existingUser) {
//             throw  new ApiError(409,'User already existed')
//         }

//         const hashPassword = await bcrypt.hash(
//             data.password,
//             10
//         )

//         const user : any = this.authRepository.createUser({
//             ...data,
//             password: hashPassword
//         })

//         const accessToken = generateAccessToken({
//             userId: user.id,
//         });
        
//         return {
//             user: {
//               id: user.id,
//               name: user.name,
//               email: user.email,
//               accessToken:accessToken
//             },
//         };

//     }
// }