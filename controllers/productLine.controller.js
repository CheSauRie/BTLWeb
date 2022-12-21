const { ProductLines } = require('../models')


const createProductLine = async (req, res) => {
    const { name, description, warranty_time } = req.body;
    try {
        const checkExistProductLine = await ProductLines.findOne({
            where: {
                name,
            }
        })
        if (checkExistProductLine) {
            res.status(500).send("Dòng sản phẩm này đã tồn tại")
        } else {
            const newProductLine = await ProductLines.create({ name, description, warranty_time });
            res.status(201).send(newProductLine);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllProductLine = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const productLineList = await ProductLines.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                },
            });
            res.status(200).send(productLineList);
        } else {
            const productLineList = await ProductLines.findAll();
            res.status(200).send(productLineList);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailProductLine = async (req, res) => {
    const { id } = req.params;
    try {
        const detailProductLine = await ProductLines.findOne({
            where: {
                id,
            },
        });
        if (detailProductLine) {
            res.status(200).send(detailProductLine);
        } else {
            res.status(400).json({ message: "Không tìm thấy dòng sản phẩm" })
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateProductLine = async (req, res) => {
    const { id } = req.params;
    const { name, description, warranty_time } = req.body;
    try {
        const detailProductLine = await ProductLines.findOne({
            where: {
                id,
            },
        });
        if (detailProductLine) {
            detailProductLine.name = name;
            detailProductLine.description = description;
            detailProductLine.warranty_time = warranty_time;
            await detailProductLine.save();
            res.status(200).send(detailProductLine);
        }
        else {
            res.status(400).send({ message: "Dòng sản phẩm không tồn tại" })
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteProductLine = async (req, res) => {
    const { id } = req.params;
    try {
        const detailProductLine = await ProductLines.findOne({
            where: {
                id,
            },
        });
        if (detailProductLine) {
            await ProductLines.destroy({
                where: {
                    id,
                },
            });
            res.status(200).send("xóa thành công");
        }
        else {
            res.status(400).send({ message: "Dòng sản phẩm không tồn tại" })
        }
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = {
    createProductLine,
    getAllProductLine,
    getDetailProductLine,
    updateProductLine,
    deleteProductLine
}