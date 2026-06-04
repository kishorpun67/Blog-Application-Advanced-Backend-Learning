import { IUser } from "../../types/index.js";

export  const toUserResponse = (user:IUser) =>{ 
    return {
        id:user.id,
        username:user.username,
        email:user.email,
        createdAt:user.createdAt
    }
}

