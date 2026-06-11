import { Comment } from "../../../generated/prisma/index.js";


export interface ICommentRepository{
    createComment(data:{userId:string,postId:string,comment:string}):Promise <Comment>
    getComments(postId:string):Promise <Comment[]>
    getComment(commentId:string):Promise <Comment | null>
    updateComment(data:{userId:string,commentId:string,comment:string}):Promise <Comment>
    deleteComment(commentId:string):Promise <Comment | null>
}