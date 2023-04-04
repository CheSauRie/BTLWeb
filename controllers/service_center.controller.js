const { sequelize, ProductHistory, warranty, WarrantyDetails, Products } = require('../models')
const { QueryTypes, where } = require('sequelize');

//Nhận các sản phẩm bảo hành từ đại lí done
const getProError = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT products.id,products.name, products.code, warrantydetails.quantity, users.username, warrantydetails.createdAt FROM users
        inner join warranties
        on users.id = warranties.agent_id
        inner join warrantydetails
        on warranties.id = warrantydetails.warranty_id
        inner join products
        on warrantydetails.product_id = products.id
        where status_warranty = "Error"`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

//Nhận các sản phẩm cần triệu hồi
const getProRecall = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT name,code,quantity FROM products, warrantydetails
        where status_warranty = "Recall" and products.id = warrantydetails.product_id`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

//Trả sản phẩm cho đại lí 
const giveProToAgent = async (req, res) => {
    const { user } = req;
    const { product_id } = req.body
    try {
        const pro = await WarrantyDetails.findOne({ where: { product_id } })
        pro.status_warranty = "Fixed"
        await pro.save()
        const newHistory = await ProductHistory.create({ service_center_id: user.id, product_id: product_id, place: user.address, description: "Gửi lại sản phẩm đẫ sửa xong" })
        res.status(200).send(pro)
    } catch (error) {
        res.status(500).send({ message: "Lỗi r cu" })
    }
}

//Trả sản phẩm cho đại lí 
const giveProToAgentCannotFix = async (req, res) => {
    const { user } = req;
    const { product_id } = req.body
    try {
        const pro = await WarrantyDetails.findOne({ where: { product_id } })
        pro.status_warranty = "Cannot Fix"
        await pro.save()
        const newHistory = await ProductHistory.create({ service_center_id: user.id, product_id: product_id, place: user.address, description: "Gửi lại sản phẩm không thể sửa" })
        res.send(pro)
    } catch (error) {
        res.status(500).send(error)
    }
}

//Báo sản phẩm hỏng cho cơ sở sản xuất
const giveProToFac = async (req, res) => {
    const { user } = req;
    const { product_id } = req.body
    try {
        const pro = await WarrantyDetails.findOne({ where: { product_id } })
        pro.status_warranty = "Recall"
        const product = await Products.findOne({
            where: {
                id: product_id
            }
        })
        product.status = "Recall"
        await product.save()
        await pro.save()
        const newHistory = await ProductHistory.create({ service_center_id: user.id, place: user.address, description: "Gửi lại sản phẩm cần triệu hồi" })
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getProError,
    getProRecall,
    giveProToAgent,
    giveProToFac,
    giveProToAgentCannotFix
}