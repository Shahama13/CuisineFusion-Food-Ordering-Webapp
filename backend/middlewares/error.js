const errorMiddleWare = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    console.log(err.name)
    if (err.name === "CastError") {
        err.message = `Invalid ${err.path}`,
        err.statusCode = 400
    }

    if(err.name==="JsonWebTokenError"){
        err.message = `Invalid Token, Try again`,
        err.statusCode = 400
    }

    if(err.name==="TokenExpiredError"){
        err.message = `Token Expired, Try again`,
        err.statusCode = 400
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}

export default errorMiddleWare