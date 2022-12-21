const { User } = require('../models')
const bcrypt = require("bcryptjs")

//tạo tài khoản mới chỉ tạo cơ sở sản xuất, đại lí phân phối, trung tâm bảo hành 
const createAccount = async (req, res) => {
    const { code, name, email, password, address, type } = req.body;
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
            const newUser = await User.create({ code, name, email, password: hashPassword, address, type });
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
    const { name, email, password, address, type } = req.body;
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
            detailAccount.name = name;
            detailAccount.email = email;
            detailAccount.password = hashPassword;
            detailAccount.address = address;
            detailAccount.type = type
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

module.exports = {
    createAccount,
    getAllAccount,
    getDetailAccount,
    updateAccount,
    deleteUser,
}