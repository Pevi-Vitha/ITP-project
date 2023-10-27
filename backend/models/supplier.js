const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({

    name : {
        type : String,
        required: true
    },
    address : {
        type : String,
        required:true
    },
    email : {
        type : String,
        required: true
    },
    NIC : {
        type : String,
        required: true
    },
    contactNumber : {
        type : String,
        required: true
    }

})

const supplier = mongoose.model("supplierr",supplierSchema);

module.exports = supplier;