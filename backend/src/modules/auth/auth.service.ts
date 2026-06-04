

// import { AuthRepository } from "./auth.repository.js";
import { RegisterUserData } from "./auth.dto.js";
import { ApiError } from "../../common/utils/ApiError.js";
import { comparePassword, hashPassword, hashRefreshToken } from "../../common/helpers/auth.helper.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../common/helpers/jwt.helpers.js";
import { toUserResponse } from "./auth.mapper.js";
import { loginDTO, refreshTokenDTO } from "./auth.validator.js";
import { JWTPayload } from "../../types/index.js";
import { IAuthRepository } from "./auth.interface.js";

export class  AuthService  {

    constructor(private repo: IAuthRepository) {

    }
    async registerUser(data:RegisterUserData) {

        const existingUser = await this.repo.findByEmail(data.email)
        if(existingUser) {
            throw  new ApiError(409,'User already existed')
        }
    
        const hashPass = await hashPassword(data.password)
        const user = await this.repo.createUser({...data, password:hashPass})
    
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id)

        const hashToken = hashRefreshToken(refreshToken)
        await this.repo.createRefreshToken({
            userId : user.id,
            token :hashToken,
            expiresAt : new Date(Date.now()+ 7 * 24 * 60 * 60* 1000).toISOString()
        })
        
        return {
            user: toUserResponse(user),
            accessToken,
            refreshToken
        }
    }

    async loginUser(data:loginDTO) {

        const user = await  this.repo.findByEmail(data.email)
        if(!user) {
            throw  new ApiError(404,'Invalid email or password')
        }

        const checkPassword = await comparePassword(data.password, user.password )
        if(!checkPassword) {
            throw  new ApiError(404,'Invalid email or password')
        }
            
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id)
        
        const hashToken = hashRefreshToken(refreshToken) 
        await this.repo.createRefreshToken({
            userId : user.id,
            token :hashToken,
            expiresAt : new Date(Date.now()+ 7 * 24 * 60 * 60* 1000).toISOString()
        })

        return {
            user: toUserResponse(user),
            accessToken,
            refreshToken
        }    
    }

    async refreshToken(body: refreshTokenDTO){
        const {token} = body;
        if(!token) {
            throw new ApiError(401, 'Refresh token is required')
        }

        let decoded;
        try{
            decoded =  verifyRefreshToken(token) as JWTPayload
        } catch (error) {
            throw new ApiError(403, 'Invalid token or expired token')
        }
        const hashedToken = hashRefreshToken(token)
        const existingToken  = await this.repo.findRefreshToken(hashedToken)
        if(!existingToken) {
            throw new ApiError(403, 'Refresh token not found')
        }

        await this.repo.deleteRefreshTokenById(existingToken.id)

        const newAccessToken = generateAccessToken(decoded.userId)
        const newRefreshToken = generateRefreshToken(decoded.userId)

        const  newRefreshHashToken = hashRefreshToken(newRefreshToken);
        await this.repo.createRefreshToken({
            userId : decoded.userId,
            token :newRefreshHashToken,
            expiresAt : new Date(Date.now()+ 7 * 24 * 60 * 60* 1000).toISOString()
        })
        return {
            accessToken : newAccessToken,
            refreshToken: newRefreshHashToken
        }
    }

    async currentUser(userId:string) {
        const user = await this.repo.findById(userId)
        if(!user) {
            throw new ApiError(401, 'User doesnot exists')
        }
        return {
        user:toUserResponse(user)
        }
    }
    async logout(refreshToken:string){

        if(!refreshToken) {
            throw new ApiError(401, 'Refresh token required')
        }
        const verifyToken = verifyRefreshToken(refreshToken)
        const refreshTokenHash = hashRefreshToken(verifyToken)
        const existingToken = await this.repo.findRefreshToken(refreshTokenHash)
        if(!existingToken) {
            throw new ApiError(404, 'Invalid Refresh Token')
        }
        await this.repo.deleteRefreshTokenById(existingToken.id)
        return true;
        // const refreshToken = verifyRefreshToken(userId);
        // const token = await this.repo.deleteRefreshTokenByUserId(userId)
        // return token;
    }

    async  logoutAll(userId:String){

        if(!userId) {
            throw new ApiError(401, 'user not autenticated')
        }
        await this.repo.deleteRefreshTokenByUserId(userId)
        return true;

    }

    
}

// export class AuthService {
//     private  this.repo =new AuthRepository()

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

