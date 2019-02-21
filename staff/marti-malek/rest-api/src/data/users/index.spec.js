'use strict'

require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')
const users = require('.')
const { expect } = require('chai')

const { env: { DB_URL } } = process

describe('user', () => {
    let client

    before(() =>
        MongoClient.connect(DB_URL, { useNewUrlParser: true })
            .then(_client => {
                client = _client
                users.collection = client.db().collection('users')
            })
    )

    beforeEach(() => users.collection.deleteMany())

    describe('add', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        it('should succeed on correct data', () =>
            users.add(_user)
                .then(id => {
                    expect(id).to.exist
                    expect(id).to.be.a('string')

                    return users.collection.findOne({ _id: ObjectId(id) })
                })
                .then(({ name, surname, email, password }) => {
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        )
        it('should fail on undefined user', () => {
            const testUser = undefined
            expect(() => users.add(testUser)).to.throw(Error, 'user should be defined')
        })
        it('should fail on boolean user', () => {
            const testUser = true
            expect(() => users.add(testUser)).to.throw(TypeError, `${testUser} should be an object`)
        })
        it('should fail on string user', () => {
            const testUser = 'hi'
            expect(() => users.add(testUser)).to.throw(TypeError, `${testUser} should be an object`)
        })
        it('should fail on number user', () => {
            const testUser = 4
            expect(() => users.add(testUser)).to.throw(TypeError, `${testUser} should be an object`)
        })
        it('should fail on null user', () => {
            const testUser = null
            expect(() => users.add(testUser)).to.throw(Error, `user should be defined`)
        })
        it('should fail on date user', () => {
            const testUser = Date
            expect(() => users.add(testUser)).to.throw(TypeError, `${testUser} should be an object`)
        })
        it('should fail on error user', () => {
            const testUser = Error
            expect(() => users.add(testUser)).to.throw(TypeError, `${testUser} should be an object`)
        })
    })
    describe('findByEmail', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        beforeEach(() => {
            users.collection.insertOne(_user)
        })

        it('should succeed on correct data', () =>
            users.findByEmail(_user.email)
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.exist
                    expect(user.name).to.be.a('string')
                    expect(user.surname).to.exist
                    expect(user.surname).to.be.a('string')
                    expect(user.email).to.exist
                    expect(user.email).to.be.a('string')
                    expect(user.password).to.exist
                    expect(user.password).to.be.a('string')
                })
        )
    })
    describe('findByUserId', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }
        let userId

        beforeEach(() => {
            return users.collection.insertOne(_user)
                .then(res => userId = res.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            users.findByUserId(userId)
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.exist
                    expect(user.name).to.be.a('string')
                    expect(user.surname).to.exist
                    expect(user.surname).to.be.a('string')
                    expect(user.email).to.exist
                    expect(user.email).to.be.a('string')
                    expect(user.password).to.exist
                    expect(user.password).to.be.a('string')
                })
        )
    })
    

    after(() =>
        users.collection.deleteMany()
            .then(() => client.close())
    )
})