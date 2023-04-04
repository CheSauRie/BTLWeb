// const authorize = (arrType) => {
//     (req, res, next) => {
//         const { user } = req;
//         if (arrType.findIndex(ele => ele === user.type) > -1) {
//             next();
//         } else {
//             res.status(403).send("Khong co quyen thao tac")
//         }
//     }
// }


//middleware: check user.type có phải là ban điều hành không nếu là đúng mới cho tạo account mới 
const checkAdmin = (req, res, next) => {
    const { user } = req;
    if (user.role === "Ban điều hành") {
        next();
    } else {
        res.status(403).send("Không có quyền thao tác")
    }
}
module.exports = {

    checkAdmin
}