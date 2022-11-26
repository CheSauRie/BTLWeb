const express = require('express')

const { createAccount, login, getAllAccount, getDetailAccount, updateAccount, deleteUser } = require("../controllers/user.controllers");
const { authenticate } = require('../middlewares/auth/authenticate');
const { checkAdmin } = require('../middlewares/auth/authorize');
const { sequelize } = require('../models');

const userRouter = express.Router();
const adminRouter = express.Router();
//router login
userRouter.post("/login", login)
//router danh cho admin
adminRouter.post("/register", authenticate, checkAdmin, createAccount);
adminRouter.get("/get-all-account", getAllAccount)
//adminRouter.get("/get-all-account", authenticate, checkAdmin, getAllAccount)
adminRouter.get("/get-detail-account/:id", getDetailAccount)
adminRouter.put("/update-account/:id", updateAccount)
adminRouter.delete("/delete-account/:id", authenticate, checkAdmin, deleteUser)
module.exports = {
    userRouter,
    adminRouter
}