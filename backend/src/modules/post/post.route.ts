import {Router} from "express"
import { validate } from "../../middleware/validate.middleware.js"
import { createPostSchema, updatePostSchema } from "./post.schema.js"
import { verifyUser } from "../../middleware/auth.middleware.js"
import { upload } from "../../middleware/multer.middleware.js"
import { createPostController, deletePostController, getPostController, getUserPostsController, updatePostController } from "./post.controller.js"


const router = Router()


router.route("/create").post(
        upload.single("media"), 

        verifyUser,    
        verifyUser,    
        validate(createPostSchema),  
        createPostController
)
router.route("/your-posts").get(
    verifyUser,    

    verifyUser,
    verifyUser,    
    getUserPostsController
)
router.route("/:id").get(
        //    (req,res)=>{
        //     return res.send('test')
        // },
        verifyUser,    

    getPostController
)
router.route("/:id").patch(
    verifyUser,    

    verifyUser, 
    getPostController
)
router.route("/:id").patch(
    verifyUser,
    upload.single("media"),
    validate(updatePostSchema),
    updatePostController
)

router.route("/:id").delete(
    verifyUser,
    deletePostController
)
export default router