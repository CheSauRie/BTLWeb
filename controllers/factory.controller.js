const { Export, ExportDetail, sequelize, ProductHistory, Import, ImportDetails, Stocks, Products } = require('../models')
const { QueryTypes } = require('sequelize');

const getAllPro = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT * FROM production_move.products`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (error) {
        res.status(500).send({ message: "Không tìm thấy" })
    }
}

//get product và số lượng đã bán

const getAllProExported = async (req, res) => {
    try {
        const results = await sequelize.query(`select username,products.name, products.code, quantity, exportdetails.createdAt from users
        inner join exports
        on users.id = exports.agent_id
        inner join exportdetails
        on exports.id = exportdetails.export_id
        inner join products
        on exportdetails.product_id = products.id`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (error) {
        res.status(500).send({ message: "Không tìm thấy" })
    }
}
//Xuất sản phẩm cho đại lí done
const exportProduct = async (req, res) => {
    const { user } = req
    const { agent_id, product_id, quantity } = req.body;
    try {
        const newExport = await Export.create({ agent_id: agent_id });
        const newExportDetail = await ExportDetail.create({ product_id: product_id, export_id: newExport.id, quantity: quantity })
        const newHistory = await ProductHistory.create({ factory_id: user.id, place: user.address, product_id: product_id, description: "Xuất sản phẩm cho đại lý" })
        res.status(201).send({ newExport, newExportDetail, newHistory });
    } catch (error) {
        res.status(500).send(error);
    }
}

//Nhập vào kho done
const importToStock = async (req, res) => {
    const { user } = req
    const { stock_id, product_id, quantity } = req.body;
    try {
        const newImport = await Import.create({ stock_id: stock_id });
        const newImportDetail = await ImportDetails.create({ product_id: product_id, import_id: newImport.id, quantity: quantity })
        const newHistory = await ProductHistory.create({ factory_id: user.id, place: user.address, product_id: product_id, description: "Nhập sản phẩm vào kho của cssx" })
        res.status(201).send({ newImport, newImportDetail, newHistory });

    } catch (error) {
        res.status(500).send(error);
    }
}
//Danh sách kho của nhà máy
const getStocks = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT * FROM production_move.stocks
        where user_id =2`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

//Danh sách sản phẩm đã nhập vào kho
const getImportProduct = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT stocks.name as s_name, quantity,stocks.address,products.name as p_name, products.code FROM imports,importdetails,stocks,products
        where stocks.id = imports.stock_id and imports.id = importdetails.import_id and importdetails.product_id = products.id and user_id=2`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

//Cơ sở sản xuất nhận các sản phẩm lỗi từ trung tâm bảo hành
const getErrorProducts = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT * FROM production_move.products
        inner join productlines
        on products.productline_id = productlines.id
        where status = "Recall"`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

const getAgentList = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT * FROM production_move.users
        where substring(code,1,2) = "DL"`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}
const getDetailStock = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await sequelize.query(`SELECT id,name,address,user_id FROM production_move.stocks
        where id=${id}`, { type: QueryTypes.SELECT, plain: false })
        if (results) {
            res.status(200).send(results);
        } else {
            res.status(400).json({ message: "Không tìm thấy kho" })
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const getProByProLine = async (req, res) => {
    try {
        const results = await sequelize.query(`select pl_name,name,code,products.updatedAt,status from products
        inner join productlines
        on products.productline_id = productlines.id
        where products.status = "Recall"`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (error) {
        res.status(500).send({ message: "Không tìm thấy" })
    }
}
module.exports = {
    exportProduct,
    importToStock,
    getErrorProducts,
    getImportProduct,
    getStocks,
    getAgentList,
    getDetailStock,
    getAllPro,
    getAllProExported,
    getProByProLine
}