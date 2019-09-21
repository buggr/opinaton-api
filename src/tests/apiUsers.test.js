const assert = require('assert')
const { db } = require('./../../server')

const mongoose = require('mongoose')

const chai = require('chai')
const chaiHttp = require('chai-http')

const MOCK_DEFAULT = {
    email: 'user1@email.com',
    password: 'senha1'
}

const MOCK_CADASTRO = {
    email: 'user2@email.com',
    password: 'senha2'
}

let MOCK_ID = ""

chai.use(chaiHttp)
chai.should()
chai.use(require('chai-things'))
let expect = chai.expect

describe('API Tests suite: ', function() {
    this.timeout(Infinity)
    this.beforeAll((done) => {
        const { UsersModel } = require('./../../server')
        UsersModel.deleteMany({}, function (err) {})

        let body
        const res = chai.request(process.env.URL_API)
            .post('/users')
            .send(MOCK_DEFAULT)
            .then(result => {
                body = result.body
                MOCK_ID = body._id
                done()
            })
    })

    it('verificar conexao', async () => {
        const result = await db.isConnected()

        expect('Conectado').to.deep.equal(result)
    })

    it('cadastro', done => {
        chai.request(process.env.URL_API)
            .post('/users')
            .send(MOCK_CADASTRO)
            .then(res => {
                res.should.have.status(200)
                done()
            })
            .catch(err => {
                console.log("Erro no request")
                done(err)
            })
    })

    it('listar todos os usuarios', done => {
        chai.request(process.env.URL_API)
            .get('/users')
            .then(res => {
                res.should.have.status(200)
                res.body.should.all.have.property('_id')
                done()
             })
            .catch(err => {
                console.log("Erro no request")
                done(err)
            })
    })

    it('atualizar um usuario', done => {
        const _id = MOCK_ID
        const expected = {
            password: "senha123"
        }

        chai.request(process.env.URL_API)
            .put(`/users/${_id}`)
            .send(expected)
            .then(res => {
                res.should.have.status(200)
                res.body.should.have.property('password', 'senha123')
                done()
             })
            .catch(err => {
                console.log("Erro no request")
                done(err)
            })
    })

    it('deletar um usuario', done => {
        const _id = MOCK_ID
        chai.request(process.env.URL_API)
            .delete(`/users/${_id}`)
            .then(res => {
                res.should.have.status(200)
                done()
             })
            .catch(err => {
                console.log("Erro no request")
                done(err)
            })
    })
})