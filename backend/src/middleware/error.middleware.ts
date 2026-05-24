import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { NODE_ENV } from "../config/config.js";
import { ApiError } from "../common/utils/ApiError.js";

const errorHandler: ErrorRequestHandler = (
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
   


    let erros = err
    let error = { ...err };
    error.message = err.message;
    
    // 1. Correctly parse and track the number status code
    const statusCode = Number(err.statusCode) || 500;
    
    // 2. Track the text status string separately
    error.status = err.status || "error";


    if(erros instanceof  ApiError) {
        return res.status(statusCode).json({
                status: statusCode, // Strings belong here inside the JSON body!
                message: erros.message,
                stack: err.stack,
            erros,
        });
    }
    // Development Environment
    if (NODE_ENV === "development") {
        // FIX: Changed error.status to statusCode
        return res.status(statusCode).json({
            status: error.status, // Strings belong here inside the JSON body!
            message: error.message,
            stack: err.stack,
            error,
        });
    }

    // Production Environment (Operational Errors)
    if (error.isOperational) {
        // FIX: Changed error.status to statusCode
        return res.status(statusCode).json({
            status: error.status,
            message: error.message
        });
    }

    // Unknown or Uncaught System Errors
    // FIX: Changed error.status to 500 (safe fallback number)
    return res.status(500).json({
        status: "error",
        message: 'Something went wrong' + error.message
    });
};

export default errorHandler;