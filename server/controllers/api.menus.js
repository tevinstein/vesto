//DATA WITH MONGOOSE MODEL

const Menu = require('../models/menus')

//CONTROLLING

module.exports = {
  //get all
  getDatas: (req, res) => {
    Menu.find({}, (err, data) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(404).json({ 'message': 'Failed to get all' })
      res.status(200).json(data)
    })
  },

  //post one
  postData: (req, res) => {
    const menu = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image
    }
    Menu.create(menu, (err, data) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(304).json({ 'message': 'Failed to post' })
      res.status(200).json({'message': 'Add data successful',data})
    })
  },

  //get one
  getData: (req, res) => {
    Menu.findOne({
      _id: req.params.id
    }, (err, data) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(404).json({ 'message': 'Failed to get' })
      res.status(200).json(data)
    })
  },

  //delete one
  deleteData: (req, res) => {
    Menu.findOneAndRemove({
      _id: req.params.id
    }, (err, data) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(404).json({ 'message': 'No data found' })
      res.status(200).json({ 'message': `Data ${req.params.id} has been deleted` })
    })
  },

  //update one
  updateData: (req, res) => {
    Menu.findOneAndUpdate({
      _id: req.params.id
    }, {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image
    }, {
      new: true
      //use below to add new if data doesn't exist
      //upsert: true 
    }, (err, data) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(404).json({ 'message': 'Failed to update' })
      res.status(200).json({'message': 'Edit data successful',data})
    })
  }
}
