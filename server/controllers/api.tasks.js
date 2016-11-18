//DATA WITH MONGOOSE MODEL

const Task = require('../models/tasks')
const Chef = require('../models/chefs')
const Menu = require('../models/menus')

//CONTROLLING

module.exports = {
    //get all
    getDatas: (req, res) => {
        Task
            .find({})
            .populate('menu chef')
            .exec((err, data) => {
                if (err) res.status(400).json({ 'error': `Error: ${err}` })
                if (!data) res.status(404).json({ 'message': 'Failed to get all' })
                res.status(200).json(data)
            })
    },

    //post one
    postData: (req, res) => {
        Chef
            .findOne({ _id: req.body.chef_id })
            .exec((err, chef) => {
                Menu
                    .findOne({ _id: req.body.menu_id })
                    .exec((err, menu) => {
                        let task = new Task({
                            taskDate: req.body.taskDate,
                            description: req.body.description,
                            status: req.body.status,
                            deadline: req.body.deadline,
                            menu: menu._id,
                            chef: chef._id
                        })

                        task.save((err, data) => {
                            if (err) res.status(400).json({ 'error': `Error: ${err}` })
                            res.status(200).json({ 'message': 'Add data successful', data })
                        })

                    })

            })
    },

    //get one
    getData: (req, res) => {
        Task
            .findOne({ _id: req.params.id })
            .populate('menu chef')
            .exec((err, data) => {
                if (err) res.status(400).json({ 'error': `Error: ${err}` })
                if (!data) res.status(404).json({ 'message': 'Failed to get' })
                res.status(200).json(data)
            })
    },

    //delete one
    deleteData: (req, res) => {
        Task
            .findOneAndRemove({ _id: req.params.id })
            .exec((err, data) => {
                if (err) res.status(400).json({ 'error': `Error: ${err}` })
                if (!data) res.status(404).json({ 'message': 'No data found' })
                res.status(200).json({ 'message': `Data ${req.params.id} has been deleted` })
            })
    },

    //update one
    updateData: (req, res) => {
        Task
            .findOne({ _id: req.params.id })
            .exec((err, task) => {
                task.chef = req.body.chef_id
                task.taskDate = req.body.taskDate
                task.deadline = req.body.deadline
                task.description = req.body.description
                task.status = req.body.status
                task.menu = req.body.menu_id

                task.save((err, data) => {
                    if (err) res.status(400).json({ 'error': `Error: ${err}` })
                    res.status(200).json({ 'message': 'Edit data successful', data })
                })

            })

    }
}
