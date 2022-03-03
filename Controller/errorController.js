const appError=require("../Features/appError")
const sendErrorDev=(err,req,res) => {
    if (req.originalUrl.startsWith("/api")) {
        return res.status(err.statusCode).json({
          status: err.status,
          error: err,
          message: err.message,
          stack: err.stack,
        });
      } 
      return res.status(err.statusCode).send("error", {
        title: "Something went wrong",
        msg: err.message,
      });
}
module.exports=(err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if(process.env.NODE_ENV !== "production")
    {
        sendErrorDev(err, req, res);
    }
}
