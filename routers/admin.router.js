const express = require('express');

const { createAccount, getProByStatus, getAllAccount, getDetailAccount, getServiceCenterList, updateAccount, getProBySer, deleteUser, getProByFac, getProByAgent } = require("../controllers/admin.controller");
const { authenticate } = require('../middlewares/auth/authenticate');
const { checkAdmin } = require('../middlewares/auth/authorize');


const adminRouter = express.Router();

//router danh cho admin
adminRouter.post("/register", authenticate, createAccount);
adminRouter.get("/get-all-account", authenticate, getAllAccount)
adminRouter.get("/get-detail-account/:id", authenticate, getDetailAccount)
adminRouter.put("/update-account/:id", authenticate, updateAccount)
adminRouter.delete("/delete-account/:id", authenticate, deleteUser)
adminRouter.get("/get-pro-by-status", authenticate, getProByStatus)
adminRouter.get("/get-pro-by-fac", authenticate, getProByFac)
adminRouter.get("/get-pro-by-agent", authenticate, getProByAgent)
adminRouter.get("/get-pro-by-ser", authenticate, getProBySer)
adminRouter.get("/get-service-list", authenticate, getServiceCenterList)
module.exports = {
    adminRouter,
}