const express = require("express");
const cors=require("cors");
const errorHandler = require("./Controller/errorController");
const app = express();
app.use(cors())
const userRoute = require("./Routes/userRoute");
app.use(express.json());
app.use("/api/ver1/users", userRoute);
app.use(errorHandler);
module.exports = app;
