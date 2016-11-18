const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/api.tasks')

// ROUTING
router.get('/tasks', controller.getDatas)
router.post('/tasks', controller.postData)
router.get('/tasks/:id', controller.getData)
router.delete('/tasks/:id', controller.deleteData)
router.put('/tasks/:id', controller.updateData)

module.exports = router
