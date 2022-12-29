const { User, sequelize } = require('../models')
const { QueryTypes } = require('sequelize');
const bcrypt = require("bcryptjs")

//tạo tài khoản mới chỉ tạo cơ sở sản xuất, đại lí phân phối, trung tâm bảo hành 
const createAccount = async (req, res) => {
    const { code, username, email, password, role, phone, address } = req.body;
    try {
        //tạo ra một chuỗi ngẫu nhiên
        const salt = bcrypt.genSaltSync(10);
        //mã hóa salt + password 
        const hashPassword = bcrypt.hashSync(password, salt)
        //tạo newUser trong database 
        const checkExistUser = await User.findOne({
            where: {
                email,
            }
        })
        if (checkExistUser) {
            res.status(500).send("email đã tồn tại")
        } else {
            const newUser = await User.create({ code: code, username: username, email: email, password: hashPassword, role: role, phone: phone, address: address });
            res.status(201).send(newUser);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllAccount = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const acountList = await User.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                },
            });
            res.status(200).send(acountList);
        } else {
            const acountList = await User.findAll();
            res.status(200).send(acountList);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const detailUser = await User.findOne({
            where: {
                id,
            },
        });
        if (detailUser) {
            res.status(200).send(detailUser);
        } else {
            res.status(400).json({ message: "User not exist" })
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateAccount = async (req, res) => {
    const { id } = req.params;
    const { code, username, email, password, role, phone, address } = req.body;
    try {
        const detailAccount = await User.findOne({
            where: {
                id,
            },
        });
        if (detailAccount) {
            //tạo ra một chuỗi ngẫu nhiên
            const salt = bcrypt.genSaltSync(10);
            //mã hóa salt + password 
            const hashPassword = bcrypt.hashSync(password, salt)
            detailAccount.code = code
            detailAccount.username = username;
            detailAccount.email = email;
            detailAccount.password = hashPassword;
            detailAccount.address = address;
            detailAccount.role = role;
            detailAccount.phone = phone
            await detailAccount.save();
            res.status(200).send(detailAccount);
        }
        else {
            res.status(400).send({ message: "user not exist" })
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const detailAccount = await User.findOne({
            where: {
                id,
            },
        });
        if (detailAccount) {
            await User.destroy({
                where: {
                    id,
                },
            });
            res.status(200).send("xóa thành công");
        }
        else {
            res.status(400).send({ message: "user not exist" })
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const getProByStatus = async (req, res) => {
    try {
        const results = await sequelize.query(`select producthistories.id,name,code, producthistories.description,producthistories.createdAt from producthistories
        inner join products
        on producthistories.product_id = products.id`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send({ message: "Lỗi" })
    }
}

const getProByFac = async (req, res) => {
    try {
        const results = await sequelize.query(`select producthistories.description, producthistories.createdAt,products.name AS p_name,products.code,producthistories.place,users.username AS u_name from producthistories
        inner join products
        on producthistories.product_id = products.id
        inner join users
        on producthistories.factory_id = users.id`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send({ message: "Lỗi" })
    }
}

const getProByAgent = async (req, res) => {
    try {
        const results = await sequelize.query(`select producthistories.description, producthistories.createdAt,products.name AS p_name,products.code,producthistories.place,users.username AS u_name from producthistories
        inner join products
        on producthistories.product_id = products.id
        inner join users
        on producthistories.agent_id = users.id `, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send({ message: "Lỗi" })
    }
}

const getServiceCenterList = async (req, res) => {
    try {
        const results = await sequelize.query(`SELECT * FROM production_move.users
        where role = "Trung tâm bảo hành"`, { type: QueryTypes.SELECT, plain: false })
        res.status(201).json(results)
    } catch (e) {
        res.status(500).send({ message: "Lỗi" })
    }
}
module.exports = {
    createAccount,
    getAllAccount,
    getDetailAccount,
    updateAccount,
    deleteUser,
    getProByStatus,
    getProByFac,
    getProByAgent,
    getServiceCenterList
}