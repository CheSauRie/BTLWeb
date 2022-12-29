const express = require('express');
const { importToStock, getProductExported, createOrder, createCustomer, createWarrantyFromAgentToServiceCenter,
    getProRecall, getProCannotFix, getProductSold, createRecallPro, getSumProductSold, getProductError, getProductUnderWarranty, getCustomerId, deleteCustomer, getAllCustomer, getStock, getProductId, getProImported } = require("../controllers/agent.controller")
const { authenticate } = require('../middlewares/auth/authenticate');

const agentRouter = express.Router();
agentRouter.post("/import-to-stock", authenticate, importToStock)
agentRouter.get("/get-products-exported", getProductExported)
agentRouter.post("/create-oder", authenticate, createOrder)
agentRouter.post("/create-customer", createCustomer)
agentRouter.get("/get-pro-imported", getProImported)
agentRouter.post("/create-warranty-request", authenticate, createWarrantyFromAgentToServiceCenter)
agentRouter.get("/pro-cannot-fix", getProCannotFix)
agentRouter.get("/pro-recall", getProRecall)
agentRouter.post("/create-pro-recall", authenticate, createRecallPro)
agentRouter.get("/get-fixed-pro", getProductUnderWarranty)
agentRouter.get("/get-stock", getStock)
agentRouter.get("/get-proid/:id", getProductId)
agentRouter.get("/get-cus-id/:id", getCustomerId)
agentRouter.get("/get-all-customer", getAllCustomer)
agentRouter.delete("/delete-customer/:id", deleteCustomer)
agentRouter.get("/get-product-sold", getProductSold)
agentRouter.get("/get-pro-error", getProductError)
agentRouter.get("/get-sum-product-sold", getSumProductSold)
module.exports = {
    agentRouter,
}