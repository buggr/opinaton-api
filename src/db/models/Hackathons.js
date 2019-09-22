const mongoose = require('mongoose')

const HackathonsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    ended: {
        type: Boolean,
        required: true
    },
    endedAt: {
        type: Date
    },
    teams: {
        type: [{
            type: mongoose.Schema.Types.Mixed
        }]
    }
})

module.exports = mongoose.model('Hackathons', HackathonsSchema)