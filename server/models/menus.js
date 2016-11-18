const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const Menu = new Schema({
    name: String,
    price: Number,
    image: String,
    description: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Menu', Menu)
