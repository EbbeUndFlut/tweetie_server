const errorHandler = (err, req, res, next) => {

    //wenn statuscode vorhanden, dann diesen verwenden, sonst 500
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        //Momentan NODE_ENV = 
        stack: process.env.NODE_ENV === "production" ? 0 : err.stack
    });
}

module.exports = { errorHandler };