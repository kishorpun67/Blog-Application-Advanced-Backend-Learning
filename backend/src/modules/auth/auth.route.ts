import { Router} from "express"
import { registerUserController } from "./auth.controller.js"
import { registerSchema } from "./auth.validator.js"
import { validate } from "../../middleware/validate.middleware.js"

const router = Router()
router.route("/register").post(
    validate(registerSchema),
    registerUserController)

export default router


