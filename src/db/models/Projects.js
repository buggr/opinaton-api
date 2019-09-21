const mongoose = require('mongoose')

const ProjectsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    feedback: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },
    ref_team: {
        type: mongoose.Schema.Types.Mixed
    }
})

module.exports = mongoose.model('Projects', ProjectsSchema)