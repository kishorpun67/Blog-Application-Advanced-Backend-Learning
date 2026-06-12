
import { Post } from "@prisma/client";

export interface IPostRepository {
    createPost(data :{title: string;
        description: string;
        userId: string;
        imageUrl?: string }) :Promise<Post>
    getPostsByUserId(
        userId:string
    ):Promise <Post []>
    getPostByPostIdAndUserId(
        postId:string, 
        userId:string

    ):Promise <Post | null >
    getPostByPostId(postId:string):Promise <Post | null>
    updatePostByIdUserId(    
        data: {
            postId: string;
            userId: string;
            title: string;
            description: string;
            imageUrl?: string;
        }
    ):Promise <Post | null>
    deletPostByPostIdAndUserId(postId:string, userId:string):Promise<Post | null>
}

