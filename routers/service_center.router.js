const express = require('express');
const { createStatusForFactory, createStatusForAgent } = require("../controllers/service_center.controller")
const { authenticate } = require('../middlewares/auth/authenticate');

const serviceCenterRouter = express.Router();
serviceCenterRouter.post("/create-warranty", authenticate, createStatusForFactory)
serviceCenterRouter.post("/create-status-for-agent", authenticate, createStatusForAgent)
module.exports = {

    serviceCenterRouter

}