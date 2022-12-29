const { User } = require('../models')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const login = async (req, res) => {
    const { email, password } = req.body;
    // tìm ra user đăng nhập dựa trên email
    const user = await User.findOne({
        where: {
            email
        },
    })
    if (user) {
        // kiểm tra mật khẩu có đúng hay không
        const isAuth = bcrypt.compareSync(password, user.password);
        if (isAuth) {
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role, address: user.address, code: user.code }, "quantrinh", { expiresIn: 10 * 600 })
            res.status(200).send({ message: "đăng nhập thành công", token, role: user.role })
        } else {
            res.status(500).send({ message: "tài khoản mật khẩu không đúng " })
        }
    } else {
        res.status(404).send({ message: "không tìm thấy email" })
    }
}

module.exports = {
    login,
}