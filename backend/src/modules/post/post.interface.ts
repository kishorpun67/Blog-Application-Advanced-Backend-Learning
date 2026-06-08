import { Post } from "../../../generated/prisma/index.js";


export interface IPostRepository {
    createPost(data :{title: string;
        description: string;
        userId: string;
        imageUrl?: string }) :Promise<Post>
    getPostsByUserId(
        userId:string
    ):Promise <Post []>
    getPostById(
        postId:string, 
        userId:string

    ):Promise <Post | null >
    updatePostById(    
        data: {
            postId: string;
            userId: string;
            title: string;
            description: string;
            imageUrl?: string;
        }
    ):Promise <Post | null>

}

