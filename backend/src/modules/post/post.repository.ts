import { title } from "process";
import { prisma } from "../../lib/prisma.js";
import { IPostRepository } from "./post.interface.js";
import { Post } from "../../../generated/prisma/index.js";



export class PostRepository implements IPostRepository{
    async createPost(data:{title: string;
        description: string;
        userId: string;
        imageUrl?: string;}){
           
        return prisma.post.create({
            data: {
                title: data.title,
                description: data.description, 
                userId:data.userId,
                imageUrl: data?.imageUrl
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

    async getPostById(postId: string, userId: string): Promise<Post | null> {
        return await prisma.post.findUnique({
            where:{
                userId,
                id:postId
            }
        })
    }

    async updatePostById(        
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
                imageUrl:data.imageUrl
            }
        })
    }
     
}