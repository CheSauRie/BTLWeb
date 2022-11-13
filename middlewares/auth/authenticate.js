const jwt = require("jsonwebtoken")


//middleware: check xem dang nhap hay chua
const authenticate = (req, res, next) => {
    //check xem dang nhap chua
    const token = req.header("token");
    try {
        const decode = jwt.verify(token, "quantrinh");
        if (decode) {
            req.user = decode;
            console.log(decode);
            return next();
        } else {
            res.status(401).send("Ban chua dang nhap")
        }
    } catch (error) {
        res.status(500).send("Ban chua dang nhap")
    }

};

module.exports = {
    authenticate
}