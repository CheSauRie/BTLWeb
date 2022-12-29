const express = require('express');

const { createAccount, getProByStatus, getAllAccount, getDetailAccount, getServiceCenterList, updateAccount, deleteUser, getProByFac, getProByAgent } = require("../controllers/admin.controller");
const { authenticate } = require('../middlewares/auth/authenticate');
const { checkAdmin } = require('../middlewares/auth/authorize');


const adminRouter = express.Router();

//router danh cho admin
adminRouter.post("/register", authenticate, createAccount);
adminRouter.get("/get-all-account", getAllAccount)
adminRouter.get("/get-detail-account/:id", authenticate, getDetailAccount)
adminRouter.put("/update-account/:id", authenticate, updateAccount)
adminRouter.delete("/delete-account/:id", authenticate, deleteUser)
adminRouter.get("/get-pro-by-status", getProByStatus)
adminRouter.get("/get-pro-by-fac", getProByFac)
adminRouter.get("/get-pro-by-agent", getProByAgent)
adminRouter.get("/get-service-list", getServiceCenterList)
module.exports = {
    adminRouter,
}