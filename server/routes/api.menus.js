const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/api.menus')

// ROUTING
router.get('/menus', controller.getDatas)
router.post('/menus', controller.postData)
router.get('/menus/:id', controller.getData)
router.delete('/menus/:id', controller.deleteData)
router.put('/menus/:id', controller.updateData)

module.exports = router
