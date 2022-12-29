const { sequelize, ProductHistory, Import, ImportDetails, warranty, WarrantyDetails, OrderDetails, Order, Customers, GiveBack, GiveBackDetail } = require('../models')
const { QueryTypes } = require('sequelize');


//Nhận danh sách sản phẩm đã xuất done
const getProductExported = async (req, res) => {
    try {
        const results = await sequelize.query(`select username,products.name, products.code, quantity, exportdetails.createdAt,products.id AS p_id from users
        inner join exports
        on users.id = exports.agent_id
        inner join exportdetails
        on exports.id = exportdetails.export_id
        inner join products
        on exportdetails.product_id = products.id`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}
//Nhập vào kho done
const importToStock = async (req, res) => {
    const { user } = req
    const { stock_id, product_id, quantity } = req.body;
    try {
        const newImport = await Import.create({ stock_id: stock_id });
        const newImportDetail = await ImportDetails.create({ product_id: product_id, import_id: newImport.id, quantity: quantity })
        const newHistory = await ProductHistory.create({ agent_id: user.id, place: user.address, stock_id: stock_id, product_id: product_id, description: "Nhập sản phẩm vào kho của đại lý" })
        res.status(201).send({ newImport, newImportDetail, newHistory });
    } catch (error) {
        res.status(500).send(error);
    }
}
const getProImported = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT products.id,stocks.name as s_name, quantity,stocks.address,products.name as p_name, products.code, importdetails.createdAt FROM imports,importdetails,stocks,products
        where stocks.id = imports.stock_id and imports.id = importdetails.import_id and importdetails.product_id = products.id and user_id=3`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

//Tạo customer done
const createCustomer = async (req, res) => {
    const { name, phone, address } = req.body;
    try {
        const newCustomer = Customers.create({ name: name, phone: phone, address: address })
        res.status(201).send(newCustomer);
    } catch (error) {
        res.status(500).send(error)
    }
}
//Bán sản phẩm cho khách hàng
const createOrder = async (req, res) => {
    const { user } = req;
    const { customer_id, product_id, quantity } = req.body
    try {
        const newOrder = await Order.create({ customer_id: customer_id });
        const newOrderDetail = await OrderDetails.create({ product_id: product_id, order_id: newOrder.id, quantity: quantity, status: "Đã bán" })
        const newHistory = await ProductHistory.create({ agent_id: user.id, place: user.address, product_id: product_id, customer_id: customer_id, description: "Sản phẩm đã bán cho khách hàng" })
        res.status(201).send({ newOrder, newOrderDetail, newHistory });
    } catch (error) {
        res.status(500).send(error);
    }
}

//Tạo yêu cầu bảo hành gửi cho trung tâm bảo hành
const createWarrantyFromAgentToServiceCenter = async (req, res) => {
    const { user } = req;
    const { quantity, product_id, service_center_id } = req.body
    try {
        const newWarranty = await warranty.create({ agent_id: user.id, service_center_id: service_center_id });
        const newWarrantyDetail = await WarrantyDetails.create({ product_id: product_id, warranty_id: newWarranty.id, status_warranty: "Error", quantity: quantity })
        const newHistory = await ProductHistory.create({ agent_id: user.id, place: user.address, description: "Đại lí gửi sản phẩm lỗi đến trung tâm bảo hành" })
        res.status(201).send({ newWarranty, newWarrantyDetail, newHistory });
    } catch (error) {
        res.status(500).send(error)
    }
}

//Tạo sản phẩm cần triệu hồi
const createRecallPro = async (req, res) => {
    const { user } = req;
    const { quantity, product_id, service_center_id } = req.body
    try {
        const newWarranty = await warranty.create({ agent_id: user.id, service_center_id: service_center_id });
        const newWarrantyDetail = await WarrantyDetails.create({ product_id: product_id, warranty_id: newWarranty.id, status_warranty: "Recall", quantity: quantity })
        const newHistory = await ProductHistory.create({ agent_id: user.id, place: user.address, description: "Đại lí báo sản phẩm cần triệu hồi" })
        res.status(201).send({ newWarranty, newWarrantyDetail, newHistory });
    } catch (error) {
        res.status(500).send(error)
    }
}

//Trả lại cho khách hàng sản phẩm đã sửa chữa
const giveBackToCustomer = async (req, res) => {
    const { customer_id, product_id } = req.body
    try {
        const warrantydt = await WarrantyDetails.findOne({ where: { product_id } })
        warrantydt.status_warranty = "Giveback"
        await warranty.save();
        const newGiveBack = await GiveBack.create({ customer_id });
        const newGiveBackDetail = await GiveBackDetail.create({ product_id: product_id, newGiveBack: newGiveBack.id })
        res.status(201).send({ newGiveBack, newGiveBackDetail });
    } catch (error) {
        res.status(500).send(error)
    }
}

//Danh sách sản phẩm bảo hành xong 
const getProductUnderWarranty = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT products.name, products.code, warrantydetails.quantity, users.username, warrantydetails.updatedAt,warrantydetails.status_warranty FROM users
        inner join warranties
        on users.id = warranties.service_center_id
        inner join warrantydetails
        on warranties.id = warrantydetails.warranty_id
        inner join products
        on warrantydetails.product_id = products.id
        where status_warranty = "Fixed"`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

//Danh sách sản phẩm đã trả lại
const getGiveBackPro = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT * FROM products, givebacks, givebackdetails
        where products.id = givebackdetails.product_id and givebacks.id = givebackdetails.giveback_id`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

//Danh sách sản phẩm không thể sửa
const getProCannotFix = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT name,code,quantity, warrantydetails.updatedAt,warrantydetails.status_warranty FROM products, warrantydetails
        where status_warranty = "Cannot Fix" and products.id = warrantydetails.product_id`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

//Danh sách sản phẩm cần triệu hồi
const getProRecall = async (req, res) => {
    try {
        const results = await sequelize.query(`select username,name,products.code,status_warranty,warrantydetails.updatedAt from users
        inner join warranties
        on users.id = warranties.service_center_id
        inner join warrantydetails
        on warranties.id = warrantydetails.warranty_id
        inner join products
        on warrantydetails.product_id = products.id
        where status_warranty ="Recall"`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

//Danh sách kho của đại lí 
const getStock = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT * FROM production_move.stocks
        where user_id = 3`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

const getProductId = async (req, res) => {
    const { id } = req.params
    try {
        const results = await sequelize.query(`select products.id AS product_id from products
        where products.id = ${id}`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

const getAllCustomer = async (req, res) => {
    try {
        try {
            const results = await sequelize.query(`SELECT * FROM production_move.customers;`, { type: QueryTypes.SELECT, plain: false })
            res.status(201).json(results)
        } catch (e) {
            res.status(500).send(e)
        }
    } catch (error) {

    }
}

const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const detailProduct = await Customers.findOne({
            where: {
                id,
            },
        });
        if (detailProduct) {
            await detailProduct.destroy({
                where: {
                    id,
                },
            });
            res.status(200).send("xóa thành công");
        }
        else {
            res.status(400).send({ message: "Sản phẩm không tồn tại" })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
const getCustomerId = async (req, res) => {
    const { id } = req.params
    try {
        const results = await sequelize.query(`SELECT customers.id AS customer_id FROM production_move.customers
        where customers.id = ${id}`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

const getProductSold = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT customers.name, customers.phone, code,quantity,orderdetails.status, orderdetails.createdAt FROM customers
        inner join orders
        on customers.id = orders.customer_id
        inner join orderdetails
        on orders.id = orderdetails.order_id
        inner join products
        on orderdetails.product_id = products.id`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

const getProductError = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT products.name, products.code, warrantydetails.quantity, users.username, warrantydetails.createdAt FROM users
        inner join warranties
        on users.id = warranties.service_center_id
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

//Danh sách và số lượng bán ra trong tháng
const getSumProductSold = async (req, res) => {
    try {
        const results = await sequelize.query(`select sum(quantity) as sum_quantity,products.name, products.code  from customers
        inner join orders
        on customers.id = orders.customer_id
        inner join orderdetails
        on orders.id = orderdetails.order_id
        inner join products
        on orderdetails.product_id = products.id
        group by products.name`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}
module.exports = {
    importToStock,
    getProductExported,
    createOrder,
    createCustomer,
    getGiveBackPro,
    createWarrantyFromAgentToServiceCenter,
    getProductUnderWarranty,
    giveBackToCustomer,
    getProCannotFix,
    getProRecall,
    createRecallPro,
    getStock,
    getProductId,
    getProImported,
    getAllCustomer,
    deleteCustomer,
    getCustomerId,
    getProductSold,
    getProductError,
    getSumProductSold
}