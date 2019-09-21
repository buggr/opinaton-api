const { config } = require('dotenv')
const { join } = require('path')
const { ok } = require('assert')

const env = process.env.NODE_ENV || "dev"
ok(env === "prod" || env === "dev", "a env é inválida, ou dev ou prod")
const configPath = join(__dirname, `.env.${env}`)
config({
    path: configPath
})

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Mongodb = require('./src/db/mongo/mongodb')

const app = express()

const server = require('http').createServer(app)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())

app.use(express.static('coverage'))

const connection = Mongodb.connect()
const UsersModel = require('./src/db/models/Users')
const HackathonsModel = require('./src/db/models/Hackathons')
const ProjectsModel = require('./src/db/models/Projects')
const TeamsModel = require('./src/db/models/Teams')

const user_db = new Mongodb(connection, UsersModel)
const hack_db = new Mongodb(connection, HackathonsModel)
const proj_db = new Mongodb(connection, ProjectsModel)
const team_db = new Mongodb(connection, TeamsModel)
    
app.use('/api', require('./src/routes/routes'))

app.get('/coverage', (req, res) => {
    res.sendFile(__dirname + '/coverage/index.html')
})

const listener = server.listen(3030, () => {
    console.log("Node is listening on port: " + listener.address().port)
})

module.exports = { UsersModel, HackathonsModel, ProjectsModel, TeamsModel, user_db, hack_db, proj_db, team_db }