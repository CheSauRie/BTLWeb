const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const { sequelize } = require("./models");
const { rootRouter } = require("./routers");
const cors = require('cors')
const app = express();

// cài ứng dụng sử dụng kiểu json
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
//alow cors
app.use(cors())
// cài static file
const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));

// dùng router
app.use("/api/v1", rootRouter);

// lắng nghe sự kiện kết nối
app.listen(3001, async () => {
    console.log("App listening on http://localhost:3000");
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
