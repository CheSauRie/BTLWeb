const express = require('express');

const { login } = require("../controllers/user.controllers");

const userRouter = express.Router();


//router login
userRouter.post("/login", login)

module.exports = {
    userRouter,
}