const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/api.chefs')

// ROUTING
router.get('/chefs', controller.getDatas)
router.post('/chefs', controller.postData)
router.get('/chefs/:id', controller.getData)
router.delete('/chefs/:id', controller.deleteData)
router.put('/chefs/:id', controller.updateData)

module.exports = router
