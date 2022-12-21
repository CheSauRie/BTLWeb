const { Export, ExportDetail, sequelize, ProductHistory, Import, ImportDetails } = require('../models')
const { QueryTypes } = require('sequelize');


//Xuất sản phẩm cho đại lí
const exportProduct = async (req, res) => {
    const { user } = req
    const { agent_id, product_id, quantity } = req.body;
    try {
        const newExport = await Export.create({ agent_id: agent_id });
        const newExportDetail = await ExportDetail.create({ product_id: product_id, export_id: newExport.id, quantity: quantity })
        const newHistory = await ProductHistory.create({ factory_id: user.id, agent_id: agent_id, place: user.address, status_id: 1, product_id: product_id, description: "Xuất sản phẩm cho đại lý" })
        res.status(201).send({ newExport, newExportDetail, newHistory });
    } catch (error) {
        res.status(500).send(error);
    }
}

//Nhập vào kho
const importToStock = async (req, res) => {
    const { user } = req
    const { stock_id, product_id, quantity } = req.body;
    try {
        const newImport = await Import.create({ stock_id: stock_id });
        const newImportDetail = await ImportDetails.create({ product_id: product_id, import_id: newImport.id, quantity: quantity })
        if (user.type === "Cơ sở sản xuất") {
            const newHistory = await ProductHistory.create({ factory_id: user.id, place: user.address, status_id: 1, stock_id: stock_id, product_id: product_id, description: "Nhập sản phẩm vào kho của cssx" })
            res.status(201).send({ newImport, newImportDetail, newHistory });
        } else {
            const newHistory = await ProductHistory.create({ agent_id: user.id, place: user.address, status_id: 2, stock_id: stock_id, product_id: product_id, description: "Nhập sản phẩm vào kho của đại lý" })
            res.status(201).send({ newImport, newImportDetail, newHistory });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

//Cơ sở sản xuất nhận các sản phẩm lỗi từ trung tâm bảo hành
const getErrorProducts = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT service_center_id,name,product_id FROM warranties, warrantydetails,products
        where warranties.id = warrantydetails.warranty_id and status_id= 9 and warrantydetails.product_id = products.id`, { type: QueryTypes.SELECT, plain: false })
        const mybObj = Object.assign({}, results) // convert result from array to object
        res.status(201).json(mybObj)
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = {
    exportProduct,
    importToStock,
    getErrorProducts,
}