const ICrud = require("./../base/baseCrud")
const mongoose = require('mongoose')

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor(connection, model) {
        super()
        this._connection = connection
        this._model = model
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if(state === 'Conectado') return state
        if(state !== 'Conectando') return state
    
        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[this._connection.readyState]
    }

    static connect() {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function(error) {
            if (!error) return;
            console.log('Falha na conexão', error)
        })

        const connection = mongoose.connection

        connection.once('open', () => console.log('database rodando!'))

        return connection
    }

    create(item) {
        return this._model.create(item)
        console.log('O item foi salvo em MongoDB')
    }

    read(item) {
        return this._model.find(item)
    }

    update(id, item) {
        return this._schema.updateOne({_id: id}, {$set: item})
    }
    
    delete(id) {
        return this._schema.deleteOne({_id: id})
    }
}

module.exports = MongoDB