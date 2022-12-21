const { sequelize, ProductHistory, warranty, WarrantyDetails } = require('../models')
const { QueryTypes } = require('sequelize');

//Trung tâm bảo hành thông báo sản phẩm lỗi cho cơ sở sản xuất
const createStatusForFactory = async (req, res) => {
    const { user } = req;
    const { product_id, factory_id } = req.body
    try {
        const newWarranty = await warranty.create({ service_center_id: user.id });
        const newWarrantyDetail = await WarrantyDetails.create({ product_id: product_id, warranty_id: newWarranty.id, status_id: 9 })
        const newHistory = await ProductHistory.create({ factory_id: factory_id, service_center_id: user.id, status_id: 9, description: "Sản phẩm cần đưa về cơ sở sản xuất" })
        res.status(201).send({ newWarranty, newWarrantyDetail, newHistory });
    } catch (error) {
        res.status(500).send(error);
    }
}

//Trung tâm bảo hành thông báo lỗi đã sửa xong cho đại lý
const createStatusForAgent = async (req, res) => {
    const { user } = req;
    const { product_id, agent_id } = req.body
    try {
        const newWarranty = await warranty.create({ service_center_id: user.id });
        const newWarrantyDetail = await WarrantyDetails.create({ product_id: product_id, warranty_id: newWarranty.id, status_id: 12 })
        const newHistory = await ProductHistory.create({ agent_id: agent_id, service_center_id: user.id, status_id: 6, description: "Sản phẩm đã bảo hành xong và đưa lại cho đại lý" })
        res.status(201).send({ newWarranty, newWarrantyDetail, newHistory });
    } catch (error) {
        res.status(500).send(error);
    }
}



module.exports = {
    createStatusForFactory,
    createStatusForAgent,
}