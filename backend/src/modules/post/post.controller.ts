import { NextFunction, Request, Response } from "express"
import { asyncHandler } from "../../common/utils/asyncHandler.js"
import { postService } from "./post.container.js"


export const createPostController = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    // return res.json(req.file?.path)
    const result = await postService.createPost(
        req.body,
        req.userId as string,
        req.file?.path
    )
    return res.status(201).json({
        success:true,
        message: 'Post has been create successfully',
        data: result
    });
}) 

export const getUserPostsController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await postService.getUserPosts(req.userId as string)
    return res.status(200).json({
        success:true,
        message:'Your posts has been fetch succesfully',
        data:result
    })

})

export const getPostController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await postService.getPost(req.params.id as string , req.userId as string)
    return res.status(200).json({
        success:true,
        message:'Your post has been fetch succesfully',
        data:result
    })
})

export const updatePostController = asyncHandler(async(req:Request, res:Response)=> {
    const result = await postService.updatePost(
        req.body, 
        req.params.id as string, 
        req.userId as string, 
        req.file?.path)

    return res.status(200).json({
        success:true,
        message:'Post has been upated succesfully',
        data:result
    })
})


export const deletePostController = asyncHandler(async (req:Request, res:Response) =>{
    const result  = await postService.deletPost(req.params.id as string, req.userId as string)
    return res.status(200).json({
        success:true,
        message:'Post has been deleted succesfully',
        data:result
    })})