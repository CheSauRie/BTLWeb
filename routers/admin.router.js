const express = require('express');

const { createAccount, getAllAccount, getDetailAccount, updateAccount, deleteUser } = require("../controllers/admin.controller");
const { authenticate } = require('../middlewares/auth/authenticate');
const { checkAdmin } = require('../middlewares/auth/authorize');


const adminRouter = express.Router();

//router danh cho admin
adminRouter.post("/register", createAccount);
adminRouter.get("/get-all-account", getAllAccount)
adminRouter.get("/get-detail-account/:id", getDetailAccount)
adminRouter.put("/update-account/:id", updateAccount)
adminRouter.delete("/delete-account/:id", deleteUser)

module.exports = {

    adminRouter,

}