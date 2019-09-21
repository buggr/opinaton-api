const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const User = require('./../models/Users')

module.exports = {
    async listAll(req, res) {
        const user = await User.find()

        return res.json(user)
    },

    async store(req, res) {
        const finder = await User.findOne('email': req.body.email)

        if(!finder) {
            const user = await User.create(req.body)
            return res.json(user)
        }

        return res.json(finder)
    },

    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.json(user)
    },

    async destroy(req, res) {
        await User.findOneAndRemove(req.params.id)

        return res.send()
    }
}