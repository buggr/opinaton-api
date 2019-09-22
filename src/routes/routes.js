const express = require('express')
const routes = express.Router()

const UsersController = require('./../db/controllers/UsersController')
const HackathonsController = require('./../db/controllers/HackathonsController')
const ProjectsController = require('./../db/controllers/ProjectsController')
const TeamsController = require('./../db/controllers/TeamsController')

routes.get('/users', UsersController.listAll)
routes.get('/user', UsersController.listOneByName)
routes.post('/users', UsersController.store)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.destroy)

routes.get('/hackathons', HackathonsController.listAll)
routes.get('/hackathon', HackathonsController.listOneByName)
routes.post('/hackathons', HackathonsController.store)
routes.put('/hackathons/:id/team/:teamId', HackathonsController.linkTeams)
routes.put('/hackathons/:id', HackathonsController.update)
routes.delete('/hackathons/:id', HackathonsController.destroy)

routes.get('/projects', ProjectsController.listAll)
routes.get('/project', ProjectsController.listOneByName)
routes.post('/projects', ProjectsController.store)
routes.put('/projects/:id/team/:teamId', ProjectsController.linkTeam)
routes.put('/projects/:id', ProjectsController.update)
routes.delete('/projects/:id', ProjectsController.destroy)

routes.get('/teams', TeamsController.listAll)
routes.get('/team', TeamsController.listOneByName)
routes.post('/teams', TeamsController.store)
routes.put('/teams/:id/user/:userId', TeamsController.linkParticipant)
routes.put('/teams/:id/project/:projId', TeamsController.linkProject)
routes.put('/teams/:id', TeamsController.update)
routes.delete('/teams/:id', TeamsController.destroy)

module.exports = routes