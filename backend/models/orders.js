const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    fuelType : {
        type : String,
        // required : true
    },
    amount : {
        type : String,
        // required : true
    },
    orderDate : {
        type : String,
        // required : true
    },
    deliveryDate : {
        type : String,
        // required : true
    },
    price : {
        type : Number,
        // required : true
    }
}) 

const Admin = mongoose.model("ClientOrder",orderSchema);

module.exports = Admin;