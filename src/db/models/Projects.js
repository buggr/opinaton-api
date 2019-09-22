const mongoose = require('mongoose')
const mongooseFindAndFilter = require('mongoose-find-and-filter')

const ProjectsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    feedback: {
        type: [mongoose.Schema.Types.Mixed]
    },
    ref_team: {
        type: mongoose.Schema.Types.Mixed
    }
})

ProjectsSchema.plugin(mongooseFindAndFilter)

module.exports = mongoose.model('Projects', ProjectsSchema)