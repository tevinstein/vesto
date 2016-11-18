const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Menu = require('./menus'),
    Chef = require('./chefs'),
    moment = require('moment')
//
const Task = new Schema({
    taskDate: Date,
    description: String,
    status: String,
    deadline: String,
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    },
    chef: {
        type: Schema.Types.ObjectId,
        ref: 'Chef'
    }
}, {
    timestamps: true
})

Task.methods.toJSON = function() {
    var obj = this.toObject()
    obj.taskDate = moment(obj.taskDate).format('YYYY-MM-DD')
    return obj
};

module.exports = mongoose.model('Task', Task)
