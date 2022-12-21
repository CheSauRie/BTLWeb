const express = require('express');
const { importToStock, exportProduct, getErrorProducts } = require("../controllers/factory.controller")
const { getAllProduct } = require("../controllers/product.controller")
const { authenticate } = require('../middlewares/auth/authenticate');

const factoryRouter = express.Router();
factoryRouter.get("/get-all-product", getAllProduct)
factoryRouter.post("/import-to-stock", authenticate, importToStock)
factoryRouter.post("/export-to-agent", authenticate, exportProduct)
factoryRouter.get("/get-error-products", getErrorProducts)
module.exports = {

    factoryRouter,

}