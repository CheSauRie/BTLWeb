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
adminRouter.get("/getallaccount", authenticate, checkAdmin, getAllAccount)
adminRouter.get("/getdetailaccount/:id", authenticate, checkAdmin, getDetailAccount)
adminRouter.post("/updateaccount/:id", authenticate, checkAdmin, updateAccount)
adminRouter.post("/deleteaccount/:id", authenticate, checkAdmin, deleteUser)
module.exports = {
    userRouter,
    adminRouter
}