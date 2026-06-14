import { tr } from "zod/v4/locales";
import { prisma } from "../../lib/prisma.js";
import { IPostRepository } from "./post.interface.js";
import { Post } from "@prisma/client";
import { email } from "zod";



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

    async getPostsByUserId(userId: string,cursor?: string, limit?:number): Promise<Post[]> {
        return await prisma.post.findMany({
            where:{
                userId
            },            
            orderBy:{
                createdAt: "desc"
            },
            select:{
                id:true,
                title:true,
                description:true,
                imageUrl:true,
                createdAt:true,
                comments:true,
                author:{
                    select:{
                        id:true,
                        email:true,
                        username:true,
                        createdAt:true,
                    }
                }
            },
            take:limit,
            skip:cursor ? 1:0,
            cursor:cursor ?{ id:cursor} : undefined,
           
        })
    }
    async getAllPosts(cursor?: string, limit?: number): Promise<Post[] | null> {
        return await prisma.post.findMany({
            where:{
                userId:"fb77b133-2d13-4671-826b-7919b3413b8b"
            }
            // ,
            // take:limit,
            // skip:cursor ? 1:0,
            // cursor:cursor ?{ id:cursor} : undefined,
            // include:{
            //     comments:true
            // }
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
                author:{
                    select:{
                        id:true,
                        username:true,
                        email:true,
                        createdAt:true
                    }
                }
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