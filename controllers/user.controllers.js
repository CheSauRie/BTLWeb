const { User } = require('../models')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//tạo tài khoản mới chỉ tạo cơ sở sản xuất, đại lí phân phối, trung tâm bảo hành 
const createAccount = async (req, res) => {
    const { name, email, password, type } = req.body;
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
            const newUser = await User.create({ name, email, password: hashPassword, type });
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
        res.status(200).send(detailUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateAccount = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, type } = req.body;
    try {
        const detailAccount = await User.findOne({
            where: {
                id,
            },
        });
        //tạo ra một chuỗi ngẫu nhiên
        const salt = bcrypt.genSaltSync(10);
        //mã hóa salt + password 
        const hashPassword = bcrypt.hashSync(password, salt)

        detailAccount.name = name;
        detailAccount.email = email;
        detailAccount.password = hashPassword;
        detailAccount.type = type
        await detailAccount.save();

        res.status(200).send(detailAccount);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.destroy({
            where: {
                id,
            },
        });
        res.status(200).send("xóa thành công");
    } catch (error) {
        res.status(500).send(error);
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    // tìm ra user đăng nhập dựa trên email
    const user = await User.findOne({
        where: {
            email,
        },
    })
    if (user) {
        // kiểm tra mật khẩu có đúng hay không 
        const isAuth = bcrypt.compareSync(password, user.password);
        if (isAuth) {
            const token = jwt.sign({ email: user.email, type: user.type }, "quantrinh", { expiresIn: 10 * 60 })

            res.status(200).send({ message: "đăng nhập thành công", token })
        } else {
            res.status(500).send({ message: "tài khoản mật khẩu không đúng " })
        }
    } else {
        res.status(404).send({ message: "không tìm thấy email" })
    }
}




module.exports = {
    createAccount,
    getAllAccount,
    getDetailAccount,
    updateAccount,
    deleteUser,
    login
}