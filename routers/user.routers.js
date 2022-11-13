const express = require('express')

const { createAccount, login, getAllAccount, getDetailAccount, updateAccount, deleteUser } = require("../controllers/user.controllers");
const { authenticate } = require('../middlewares/auth/authenticate');
const { checkAdmin } = require('../middlewares/auth/authorize');

const userRouter = express.Router();

userRouter.post("/register", authenticate, checkAdmin, createAccount);
userRouter.post("/login", login)
userRouter.get("/getallaccount", authenticate, checkAdmin, getAllAccount)
userRouter.get("/getdetailaccount/:id", authenticate, checkAdmin, getDetailAccount)
userRouter.post("/updateaccount/:id", authenticate, checkAdmin, updateAccount)
userRouter.post("/deleteaccount/:id", authenticate, checkAdmin, deleteUser)
module.exports = {
    userRouter
}