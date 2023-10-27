const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    fueltype : {
        type : String,
        required: true
    },
    amount: {
        type : String,
        required:true
    },
    orderdate : {
        type : String,
        required: true
    },
    deliverydate: {
        type : String,
        required: true
    },
    price : {
        type : String,
        required: true
    }

})

const order = mongoose.model("order",orderSchema);

module.exports = order;