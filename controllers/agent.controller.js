const { sequelize, ProductHistory, Import, ImportDetails, warranty, WarrantyDetails, OrderDetails, Order, Customers, GiveBack, GiveBackDetail } = require('../models')
const { QueryTypes } = require('sequelize');


//Nhận danh sách sản phẩm đã xuất =>Trả về mảng
const getProductExported = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT name, quantity, code, price,description,thumbnail,agent_id FROM exportdetails, products,exports
    where exportdetails.product_id = products.id
    group by name`, { type: QueryTypes.SELECT, plain: false })
        const mybObj = Object.assign({}, results) // convert result from array to object
        res.status(201).json(mybObj)
    } catch (e) {
        res.status(500).send(e)
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

//Bán sản phẩm cho khách hàng
const createOrder = async (req, res) => {
    const { user } = req;
    const { customer_id, product_id, quantity } = req.body
    try {
        const newOrder = await Order.create({ customer_id: customer_id });
        const newOrderDetail = await OrderDetails.create({ product_id: product_id, order_id: newOrder.id, quantity: quantity })
        const newHistory = await ProductHistory.create({ agent_id: user.id, place: user.address, status_id: 3, product_id: product_id, customer_id: customer_id, description: "Sản phẩm đã bán cho khách hàng" })
        res.status(201).send({ newOrder, newOrderDetail, newHistory });
    } catch (error) {
        res.status(500).send(error);
    }
}
//Tạo customer 
const createCustomer = async (req, res) => {
    const { name, phone } = req.body;
    try {
        const newCustomer = Customers.create({ name: name, phone: phone })
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).send(error)
    }
}

//Tạo yêu cầu bảo hành gửi cho trung tâm bảo hành
const createWarrantyFromAgentToServiceCenter = async (req, res) => {
    const { user } = req;
    const { customer_id, quantity, number_of_warranty_time, product_id, service_center_id } = req.body
    try {
        const newWarranty = await warranty.create({ agent_id: user.id, service_center_id: service_center_id });
        const newWarrantyDetail = await WarrantyDetails.create({ product_id: product_id, warranty_id: newWarranty.id, status_id: 4, quantity: quantity, customer_id: customer_id, number_of_warranty_time: number_of_warranty_time })
        const newHistory = await ProductHistory.create({ agent_id: user.id, place: user.address, customer_id: customer_id, status_id: 4, description: "Nhận sản phẩm lỗi từ khách hàng đại lý gửi tới trung tâm bảo hành" })
        res.status(201).send({ newWarranty, newWarrantyDetail, newHistory });
    } catch (error) {
        res.status(500).send(error)
    }
}

//Đại lý nhận sản phẩm đã bảo hành xong từ trung tâm bảo hành
const getProductUnderWarranty = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT service_center_id,name,product_id FROM warranties, warrantydetails,products
        where warranties.id = warrantydetails.warranty_id and status_id= 6 and warrantydetails.product_id = products.id`, { type: QueryTypes.SELECT, plain: false })
        // const mybObj = Object.assign({}, results) // convert result from array to object
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
    }
}

//Đại lý báo sản phẩm lỗi cho cơ sở sản xuất
const createWarrantyFromAgentToFactory = async (req, res) => {
    const { user } = req;
    const { quantity, product_id, factory_id } = req.body
    try {
        const newWarranty = await warranty.create({ agent_id: user.id });
        const newWarrantyDetail = await WarrantyDetails.create({ product_id: product_id, warranty_id: newWarranty.id, status_id: 12, quantity: quantity })
        const newHistory = await ProductHistory.create({ agent_id: user.id, place: user.address, factory_id: factory_id, status_id: 12, description: "Đại lý gửi sản phẩm không thể sửa được tới cơ sở sản xuất" })
        res.status(201).send({ newWarranty, newWarrantyDetail, newHistory });
    } catch (error) {
        res.status(500).send(error)
    }
}

//Trả lại cho khách hàng sản phẩm đã sửa chữa
const giveBackToCustomer = async (req, res) => {
    const { user } = req;
    const { customer_id, product_id } = req.body
    try {
        const newGiveBack = await GiveBack.create({ customer_id });
        const newGiveBackDetail = await GiveBackDetail.create({ product_id: product_id, newGiveBack: newGiveBack.id, status_id: 7 })
        const newHistory = await ProductHistory.create({ agent_id: user.id, place: user.address, customer_id: customer_id, status_id: 7, description: "Đại lý gửi sản phẩm đã sửa chữa cho khách hàng " })
        res.status(201).send({ newGiveBack, newGiveBackDetail, newHistory });
    } catch (error) {
        res.status(500).send(error)
    }
}

//Gửi sản phẩm cần triệu hồi cho đại lí
const sendReCallProductToServiceCenter = async (req, res) => {
    const { user } = req;
    const { customer_id, quantity, number_of_warranty_time, product_id, service_center_id } = req.body
    try {
        const newWarranty = await warranty.create({ agent_id: user.id, service_center_id: service_center_id });
        const newWarrantyDetail = await WarrantyDetails.create({ product_id: product_id, warranty_id: newWarranty.id, status_id: 10, quantity: quantity, customer_id: customer_id, number_of_warranty_time: number_of_warranty_time })
        const newHistory = await ProductHistory.create({ agent_id: user.id, place: user.address, customer_id: customer_id, status_id: 10, description: "Gửi sản phẩm cần triệu hồi cho trung tâm bảo hành" })
        res.status(201).send({ newWarranty, newWarrantyDetail, newHistory });
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    importToStock,
    getProductExported,
    createOrder,
    createCustomer,
    createWarrantyFromAgentToServiceCenter,
    getProductUnderWarranty,
    createWarrantyFromAgentToFactory,
    giveBackToCustomer,
    sendReCallProductToServiceCenter
}