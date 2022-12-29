const { Products, sequelize } = require('../models')
const { QueryTypes } = require('sequelize');

//thêm sản phẩm
const createProduct = async (req, res) => {
    const { name, code, price, description, productline_id } = req.body;
    try {
        const checkExistProduct = await Products.findOne({
            where: {
                code,
            }
        })
        if (checkExistProduct) {
            res.status(500).send("Sản phẩm này đã tồn tại")
        } else {
            const newProduct = await Products.create({ name, code, productline_id, price, description, status: "Mới sản xuất" });
            res.status(201).send({ newProduct });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

//Lấy danh sách sản phẩm theo danh mục
const getAllProduct = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT products.id,name,code,price,status,pl_name,warranty_time,description
        FROM products
        inner join productlines
        on products.productline_id = productlines.id`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send(e)
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
    const { name, code, price, description, productline_id } = req.body;
    try {
        const detailProduct = await Products.findOne({
            where: {
                id,
            },
        });
        if (detailProduct) {
            detailProduct.name = name
            detailProduct.code = code
            detailProduct.price = price
            detailProduct.description = description
            detailProduct.productline_id = productline_id
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

const uploadImage = async (req, res) => {
    const { id } = req.params;
    const { file } = req;
    console.log(file);
    const urlImage = `http://localhost:3001/${file.path}`
    try {
        const detailProduct = await Products.findOne({
            where: {
                id,
            },
        });
        if (detailProduct) {
            detailProduct.thumbnail = urlImage;
            await detailProduct.save();
            res.status(200).send(detailProduct);
        } else {
            res.status(400).json({ message: "Không tìm thấy sản phẩm" })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}





module.exports = {
    createProduct,
    getAllProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}