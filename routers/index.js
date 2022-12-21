const express = require("express")
const { userRouter } = require("./user.routers")
const { adminRouter } = require("./admin.router")
const { productLineRouter } = require("./productLine.router");
const { productRouter } = require("./product.router");
const { stockRouter } = require("./stock.router")
const { factoryRouter } = require("./factory.router")
const { agentRouter } = require("./agent.router");
const { serviceCenterRouter } = require("./service_center.router");

const rootRouter = express.Router();

rootRouter.use("/users", userRouter)
rootRouter.use("/admin", adminRouter)
rootRouter.use("/productline", productLineRouter)
rootRouter.use("/product", productRouter)
rootRouter.use("/stock", stockRouter)
rootRouter.use("/factory", factoryRouter)
rootRouter.use("/agent", agentRouter)
rootRouter.use("/service", serviceCenterRouter)
module.exports = {
    rootRouter,
}