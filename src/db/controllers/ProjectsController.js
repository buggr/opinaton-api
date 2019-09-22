const mongoose = require('mongoose')
const mongooseFindAndFilter = require('mongoose-find-and-filter')
mongoose.plugin(mongooseFindAndFilter)
mongoose.set('useFindAndModify', false)

const Project = require('./../models/Projects')
const Teams = require('./../models/Teams')

module.exports = {
    async linkTeam(req, res) {
        const team = await Teams.findOne({'_id': req.params.teamId}).select('-createdAt -projects -__v')

        const proj = await Project.findByIdAndUpdate(req.params.id, { ref_team: team }, { new: true })

        return res.json(proj)
    },

    async listAll(req, res) {
        const proj = await Project.find()

        return res.json(proj)
    },

    async listSelected(req, res) {
        const proj = await Projects.findAndFilter(req.query)

        return res.json(proj)
    },

    async store(req, res) {
        const proj = await Project.create(req.body)

        return res.json(proj)
    },

    async update(req, res) {
        const proj = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.json(proj)
    },

    async destroy(req, res) {
        await Project.findOneAndRemove(req.params.id)

        return res.send()
    }
}