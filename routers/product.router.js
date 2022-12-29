const express = require('express');
const { createProduct, getAllProduct, getDetailProduct, updateProduct, deleteProduct, uploadImage } = require("../controllers/product.controller")
const { authenticate } = require('../middlewares/auth/authenticate');
const { checkAdmin } = require('../middlewares/auth/authorize');
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/image/product")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const extensionImageList = [".png", ".jpg"];
        const extension = file.originalname.slice(-4);
        const check = extensionImageList.includes(extension)
        if (check) {
            cb(null, true)
        } else {
            cb(new Error("File không hợp lệ"))
        }
    }
})

const productRouter = express.Router();

productRouter.post("/", createProduct)
productRouter.post("/upload-image/:id", upload.single("thumbnail"), uploadImage)
productRouter.get("/get-all-product", getAllProduct)
productRouter.get("/get-detail-product/:id", getDetailProduct)
productRouter.put("/update-product/:id", updateProduct)
productRouter.delete("/delete-product/:id", deleteProduct)

module.exports = {
    productRouter
}