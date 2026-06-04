import { Router, Response} from "express"
import { currentUserController, loginUserController, logoutAllController, logoutController, refreshTokenController, registerUserController } from "./auth.controller.js"
import { loginSchema, refeshTokenSchema, registerSchema } from "./auth.validator.js"
import { validate } from "../../middleware/validate.middleware.js"
import { verifyUser } from "../../middleware/auth.middleware.js"

const router = Router()
router.route("/register").post(
    validate(registerSchema),
    registerUserController)

router.route("/login").post(
    validate(loginSchema),
    loginUserController)


router.route("/refreshToken").post(
        // (req,res:Response)=>{
        //     return res.send(req.body)
        // },
        validate(refeshTokenSchema),
        refreshTokenController)

router.route("/me").get(verifyUser, currentUserController)
router.route("/logout").post(verifyUser, logoutController)
router.route("/logout-all").post(verifyUser, logoutAllController)


    
export default router


