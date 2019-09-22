const mongoose = require('mongoose')
const mongooseFindAndFilter = require('mongoose-find-and-filter')
mongoose.plugin(mongooseFindAndFilter)
mongoose.set('useFindAndModify', false)

const Teams = require('./../models/Teams')
const Users = require('./../models/Users')
const Projects = require('./../models/Projects')

module.exports = {
    async linkParticipant(req, res) {
        const user = await Users.findOne({'_id': req.params.userId}).select('-password -createdAt -__v')

        const team = await Teams.findByIdAndUpdate(req.params.id, { participants: user }, { new: true })

        return res.json(team)
    },

    async listSelected(req, res) {
        const team = await Teams.findAndFilter(req.query)

        return res.json(team)
    },

    async linkProject(req, res) {
        const proj = await Projects.findOne({'_id': req.params.projId}).select('-ref_team -createdAt -__v')

        const team = await Teams.findByIdAndUpdate(req.params.id, { projects: proj }, { new: true })

        return res.json(team)
    },

    async listAll(req, res) {
        const team = await Teams.find()

        return res.json(team)
    },

    async store(req, res) {
        const team = await Teams.create(req.body)

        return res.json(team)
    },

    async update(req, res) {
        const team = await Teams.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.json(team)
    },

    async destroy(req, res) {
        await Teams.findOneAndRemove(req.params.id)

        return res.send()
    }
}