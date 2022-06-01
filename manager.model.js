var mongoose = require('mongoose');

var managerSchema = new mongoose.Schema({
    id : String,
    gender: Boolean,
    email: String,
    phone: String,
    restaurantCode: String,
    username: String,
    password: String
});

var Manager = mongoose.model('Manager', managerSchema, 'managers');

module.exports = Manager;