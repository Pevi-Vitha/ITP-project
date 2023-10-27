const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    //type warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Mongo DB connected successfully!!");
}).catch((err) => console.log("DB connection failed", err));


const supplierRouter = require("./routes/suppliers.js");
app.use("/supplier",supplierRouter);

const orderRouter = require("./routes/orders.js");
app.use("/order",orderRouter);

const ordersRouter = require("./routes/orderss.js");
app.use("/orderss",ordersRouter);


app.listen(PORT, () =>{
    console.log(`Server is up and running on port number : ${PORT}`);
})

