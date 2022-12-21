const express = require('express');
const { importToStock, getProductExported, createOrder, createCustomer, createWarrantyFromAgentToServiceCenter, createWarrantyFromAgentToFactory
    , giveBackToCustomer, sendReCallProductToServiceCenter } = require("../controllers/agent.controller")
const { authenticate } = require('../middlewares/auth/authenticate');

const agentRouter = express.Router();
agentRouter.post("/import-to-stock", authenticate, importToStock)
agentRouter.get("/get-products-exported", authenticate, getProductExported)
agentRouter.post("/create-oder", authenticate, createOrder)
agentRouter.post("/create-customer", authenticate, createCustomer)


agentRouter.post("/create-warranty-request", createWarrantyFromAgentToServiceCenter)
agentRouter.post("/create-recall-request", sendReCallProductToServiceCenter)
agentRouter.post("/return-factory", createWarrantyFromAgentToFactory)
agentRouter.post("/return-customer", giveBackToCustomer)
module.exports = {

    agentRouter,

}