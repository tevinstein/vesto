const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const Chef = new Schema({
    name: String,
    position: String,
    image: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Chef', Chef)