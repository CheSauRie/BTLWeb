const express = require('express');
const { getProError, getProRecall, giveProToAgent, giveProToFac, giveProToAgentCannotFix } = require("../controllers/service_center.controller")
const { authenticate } = require('../middlewares/auth/authenticate');

const serviceCenterRouter = express.Router();
serviceCenterRouter.get("/get-pro-error", getProError)
serviceCenterRouter.get("/get-pro-recall", getProRecall)
serviceCenterRouter.post("/give-pro-to-agent", authenticate, giveProToAgent)
serviceCenterRouter.post("/give-pro-to-fac", authenticate, giveProToFac)
serviceCenterRouter.post("/give-pro-cannot-fix-to-agent", authenticate, giveProToAgentCannotFix)
module.exports = {

    serviceCenterRouter

}