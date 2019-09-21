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

const connection = Mongodb.connect()
const UsersModel = require('./src/db/models/Users')

const db = new Mongodb(connection, UsersModel)
    
app.use('/api', require('./src/routes/routes'))

const listener = server.listen(process.env.PORT || 3030, () => {
    console.log("Node is listening on port: " + listener.address().port)
})

module.exports = { UsersModel, db }