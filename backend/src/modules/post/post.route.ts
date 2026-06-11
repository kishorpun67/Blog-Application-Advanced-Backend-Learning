import {Router} from "express"
import { validate } from "../../middleware/validate.middleware.js"
import { createPostSchema, updatePostSchema } from "./post.schema.js"
import { verifyUser } from "../../middleware/auth.middleware.js"
import { authService } from "../auth/auth.container.js"
import { upload } from "../../middleware/multer.middleware.js"
import { createPostController, deletePostController, getPostController, getUserPostsController, updatePostController } from "./post.controller.js"


const router = Router()


router.route("/create").post(
        upload.single("media"), 
        verifyUser(authService),    
        validate(createPostSchema),  
        createPostController
)
router.route("/your-posts").get(
    verifyUser(authService),
    getUserPostsController
)
router.route("/:id").get(
        //    (req,res)=>{
        //     return res.send('test')
        // },
    verifyUser(authService), 
    getPostController
)
router.route("/:id").patch(
    verifyUser(authService),
    upload.single("media"),
    validate(updatePostSchema),
    updatePostController
)

router.route("/:id").delete(
    verifyUser(authService),
    deletePostController
)
export default router