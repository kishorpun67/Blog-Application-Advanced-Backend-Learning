import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { createCommentSchema } from "./comment.schema.js";
import { verifyUser } from "../../middleware/auth.middleware.js";
import { authService } from "../auth/auth.container.js";
import { createCommentController, deleteCommentsController, getCommentController, getCommentsController, updateCommentController } from "./comment.controller.js";
import { updatePostSchema } from "../post/post.schema.js";

const router = Router()

router.route('/create/post/:id').post(
    verifyUser(authService),
    validate(createCommentSchema),
    createCommentController
)
router.route('/upate').patch(
    validate(updatePostSchema),
    verifyUser(authService),
    updateCommentController
)
router.route('/:id').get(
    verifyUser(authService),
    getCommentController
)

router.route('/get-all-comment/:id').get(
    verifyUser(authService),
    getCommentsController
)

router.route('/:id').delete(
    verifyUser(authService),
    deleteCommentsController
)




export default router