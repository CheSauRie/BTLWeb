const express = require("express")
const { userRouter, adminRouter } = require("./user.routers")
const rootRouter = express.Router();

rootRouter.use("/users", userRouter)
rootRouter.use("/admin", adminRouter)
module.exports = {
    rootRouter,
}