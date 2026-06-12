import { prisma } from "../../lib/prisma.js";
import { IPostRepository } from "./post.interface.js";
import { Post } from "@prisma/client";



export class PostRepository implements IPostRepository{
    async createPost(data:{title: string;
        description: string;
        userId: string;
        imageUrl?: string;}):Promise<Post>{
           
        return await prisma.post.create({
            data: {
                title: data.title,
                description: data.description, 
                userId:data.userId,
                imageUrl: data.imageUrl
            }
        });
        
    }

    async getPostsByUserId(userId: string): Promise<Post []> {
        return await prisma.post.findMany({
            where:{
                userId
            }
        })
    }
    async getPostByPostId(postId: string): Promise<Post | null> {
        return await prisma.post.findFirst({
            where:{
                id:postId
            },
            include:{
                comments:true
            }

        })
    }

    async getPostByPostIdAndUserId(postId: string, userId: string): Promise<Post | null> {
        return await prisma.post.findFirst({
            where:{
                userId:userId,
                id:postId
            },
            include:{
                comments:true,
                author:true
            },
            
        })
    }

    async updatePostByIdUserId(        
        data: {
            postId: string;
            userId: string;
            title: string;
            description: string;
            imageUrl?: string;
        }
    ): Promise<Post | null> 
    {
        return prisma.post.update({
            where:{
                userId:data.userId,
                id:data.postId
            },
            data:{
                title : data.title,
                description: data.description,
                ...(data.imageUrl && { imageUrl: data.imageUrl })
            }
        })
    }
   async deletPostByPostIdAndUserId(postId:string, userId:string):Promise <Post | null> {
        return prisma.post.delete({
            where:{
                id:postId,
                userId:userId
            }
        })
    }
     
}