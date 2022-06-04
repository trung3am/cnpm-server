var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    id : String,
    username: String,
    status: String,
    total: Number,
    createdAt: String,
    food: Array
});

var Order = mongoose.model('Order', OrderSchema, 'orders');

module.exports = Order;