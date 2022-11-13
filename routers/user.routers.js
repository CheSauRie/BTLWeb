const express = require('express')

const { createAccount, login, getAllAccount, getDetailAccount, updateAccount, deleteUser } = require("../controllers/user.controllers");
const { authenticate } = require('../middlewares/auth/authenticate');
const { checkAdmin } = require('../middlewares/auth/authorize');

const userRouter = express.Router();
const adminRouter = express.Router();
//router login
userRouter.post("/login", login)
//router danh cho admin
adminRouter.post("/register", authenticate, checkAdmin, createAccount);
adminRouter.get("/get-all-account", authenticate, checkAdmin, getAllAccount)
adminRouter.get("/get-detail-account/:id", authenticate, checkAdmin, getDetailAccount)
adminRouter.post("/update-account/:id", authenticate, checkAdmin, updateAccount)
adminRouter.post("/delete-account/:id", authenticate, checkAdmin, deleteUser)
module.exports = {
    userRouter,
    adminRouter
}