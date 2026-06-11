import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { Response, Request } from "express";
import { commentService } from "./comment.container.js";

export const createCommentController = asyncHandler(async(req:Request, res:Response)=>{
    // return res.json({
    //     data:req.body.comment,
    //     postId:req.params.id,
    //     user:req.userId
    // })
    const result = await commentService.createComment(req.body, req.body.id as string, req.userId as string)
    return res.status(201).json({
        success:true,
        message:'Comment has created successfully!',
        data:result
    })
})

export const updateCommentController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await commentService.updateComment(req.body, req.userId as string, req.params.id as string)
    return res.status(201).json({
        success:true,
        message:'Comment has updated successfully!',
        data:result
    })
})

export const getCommentController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await commentService.getComment(req.params.id as string)
    return res.status(201).json({
        success:true,
        message:'Your comment!',
        data:result
    })
})

export const getCommentsController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await commentService.getComments(req.params.id as string)
    return res.status(201).json({
        success:true,
        message:'Your all comment!',
        data:result
    })
})


export const deleteCommentsController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await commentService.deleteComment(req.params.id as string)
    return res.status(201).json({
        success:true,
        message:'comment has been delete succesfully!',
        data:result
    })
})

