const jwt = require("jsonwebtoken")

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        await req.user.save();
    } catch (error) {
        res.status(500).send("Lỗi server")
    }
}

module.exports = {
    logout
}