const express = require('express');
const { getImportProduct, importToStock, exportProduct, getErrorProducts, getStocks, getAgentList, getDetailStock, getAllPro, getAllProExported, getProByProLine } = require("../controllers/factory.controller")
const { getAllProduct } = require("../controllers/product.controller")
const { authenticate } = require('../middlewares/auth/authenticate');

const factoryRouter = express.Router();

factoryRouter.post("/create-product")
factoryRouter.get("/get-all-product", authenticate, getAllProduct)
factoryRouter.post("/import-to-stock", authenticate, importToStock)
factoryRouter.post("/export-to-agent", authenticate, exportProduct)
factoryRouter.get("/get-error-products", getErrorProducts)
factoryRouter.get("/get-import-product", getImportProduct)
factoryRouter.get("/get-stocks", getStocks)
factoryRouter.get("/get-agent-list", getAgentList)
factoryRouter.get("/get-detail-stock/:id", getDetailStock)
factoryRouter.get("/get-all-pro", getAllPro)
factoryRouter.get("/get-all-pro-exported", getAllProExported)
factoryRouter.get("/get-pro-by-proline", getProByProLine)
module.exports = {

    factoryRouter,

}