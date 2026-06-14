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

    const limit = Math.max(1, Number(req.query.limit) || 10) 
    const result = await postService.getUserPosts(req.userId as string, req.query.cursor  as string, limit)
    return res.status(200).json({
        success:true,
        message:'Your posts has been fetch succesfully',
        data:result
    })

})
export const getAllPostController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await postService.getAllPosts()
    return res.status(200).json({
        success:true,
        message:'All posts',
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