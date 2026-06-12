import cookieParser from "cookie-parser";
import express, {Request, Response} from "express";
import cors from 'cors'
import { FRONTEND_URL } from "./config/config.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors(
    {
        origin:FRONTEND_URL,
        credentials: true,              
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
    ))
app.get('/', (req: Request, res:Response)=>{
    return res.send('hello');
})
import authRouter from "./modules/auth/auth.route.js"
import postRouter from "./modules/post/post.route.js"
<<<<<<< HEAD
import commentRouter from "./modules/comment/commnt.route.js"
=======
import commentRouter from "./modules/comment/comment.route.js"
>>>>>>> f3915a3 (last commit)
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter)
app.use("/api/v1/comment", commentRouter)

app.use(errorHandler)   
export default app

