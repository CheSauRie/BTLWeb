const { Products, Export, ExportDetail, sequelize, ProductHistory, Import, ImportDetails, warranty, WarrantyDetails, OrderDetails, Order, Customers } = require('../models')
const { QueryTypes } = require('sequelize');

//thêm sản phẩm vào kho của cơ sở sản xuất
const createProduct = async (req, res) => {
    const { file, user } = req;
    const { name, code, productLine_id, price, description } = req.body;
    const thumbnail = `http://localhost:3001/${file.path}`
    try {
        const checkExistProduct = await Products.findOne({
            where: {
                name,
            }
        })
        if (checkExistProduct) {
            res.status(500).send("Sản phẩm này đã tồn tại")
        } else {
            const newProduct = await Products.create({ name, code, productLine_id, price, description, thumbnail });
            const newHistory = await ProductHistory.create({ factory_id: user.id, place: user.address, status_id: 1, product_id: newProduct.id, description: "Sản phẩm được tạo ra" })
            res.status(201).send({ newProduct, newHistory });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllProduct = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const productList = await Products.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                },
            });
            res.status(200).send(productList);
        } else {
            const productList = await Products.findAll();
            res.status(200).send(productList);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const detailProduct = await Products.findOne({
            where: {
                id,
            },
        });
        if (detailProduct) {
            res.status(200).send(detailProduct);
        } else {
            res.status(400).json({ message: "Không tìm thấy sản phẩm" })
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { file } = req;
    const thumbnail = `http://localhost:3001/${file.path}`
    const { name, code, productLine_id, price, unit, description, stock_id } = req.body;
    try {
        const detailProduct = await Products.findOne({
            where: {
                id,
            },
        });
        if (detailProduct) {
            detailProduct.name = name;
            detailProduct.code = code;
            detailProduct.productLine_id = productLine_id;
            detailProduct.price = price;
            detailProduct.unit = unit;
            detailProduct.description = description;
            detailProduct.thumbnail = thumbnail;
            detailProduct.stock_id = stock_id;
            await detailProduct.save();
            res.status(200).send(detailProduct);
        }
        else {
            res.status(400).send({ message: "Dòng sản phẩm không tồn tại" })
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const detailProduct = await Products.findOne({
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
};
//Xuất sản phẩm cho đại lí



module.exports = {
    createProduct,
    getAllProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct,
}