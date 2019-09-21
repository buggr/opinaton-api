const express = require('express')
const routes = express.Router()

const UsersController = require('./../db/controllers/UsersController')

routes.get('/users', UsersController.listAll)
routes.post('/users', UsersController.store)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.destroy)

module.exports = routes