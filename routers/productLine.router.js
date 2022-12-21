const express = require('express');
const { getAllProductLine, createProductLine, getDetailProductLine, updateProductLine, deleteProductLine } = require('../controllers/productLine.controller');

const { authenticate } = require('../middlewares/auth/authenticate');
const { checkAdmin } = require('../middlewares/auth/authorize');


const productLineRouter = express.Router();


productLineRouter.get("/", getAllProductLine)
productLineRouter.post("/", createProductLine)
productLineRouter.get("/:id", getDetailProductLine)
productLineRouter.put("/:id", updateProductLine)
productLineRouter.delete("/:id", deleteProductLine)


module.exports = {
    productLineRouter
}