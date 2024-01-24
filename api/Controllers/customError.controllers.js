export const notFound = (req, res, next) => 

{
    next(createError(404,`Not Found - ${req.originalUrl}`));
    
};

export const createError = (code,message)=>{
 const error = new Error();
 error.statusCode = code;
 error.message = message;
 return error;
}

export const errorMiddleware = (err, req, res, next) => {
    const code = err.statusCode ? err.statusCode : 500;
    const response = {
        status: "error",
        code,
        message: err.message,
    };

    
    

    return res.status(code).json(response);
};
