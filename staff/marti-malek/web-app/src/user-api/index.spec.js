'use strict'

const { expect } = require('chai')
const userApi = require('.')

describe('user api', () => {
    describe('register', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on correct data', () =>
            userApi.register(name, surname, username, password, passwordConfirm)
                .then(id => expect(id).to.exist)
        )

        it('should fail on already existing user', () =>
            userApi.register(name, surname, username, password, passwordConfirm)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with username \"${username}\" already exists`)
                })
        )
    })

    describe('authenticate', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let username
        let password
        let passwordConfirm = '123'

        let _id
        beforeEach(() => {
            username = `manuelbarzi-${Math.random()}`
            password = '123'

            return userApi.register(name, surname, username, password, passwordConfirm)
                .then(id => _id = id)
        })

        it('should succeed on correct data', () => 
            userApi.authenticate(username, password)
                .then(({ id, token }) => {
                    expect(id).to.equal(_id)
                    expect(token).to.exist
                })
        )
        it('should fail on non-existing username',() => {

            const testUser = 'testUser'
            userApi.authenticate(testUser, password)
             .then(() => {
                 throw Error('should not have passed by here')
             })
             .catch(error => {
                expect(error.message).to.equal(`user with username \"${testUser}\" does not exist`)
             })
        })
        it('should fail on non-matching token',() => {

            const testPassword = '123123sadnauybdas123ybajdn21i38612usdasdiuhi213' 
            userApi.authenticate(username, testPassword)
             .then(() => {
                 throw Error('should not have passed by here')
             })
             .catch(error => {
                expect(error.message).to.equal(`username and/or password wrong`)
             })
        })
        it('should fail on number password instead of string',() => {

            password = 4

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(TypeError,password + ' is not a string')
        })
        it('should fail on boolean password instead of string',() => {

            password = true

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(TypeError,password + ' is not a string')
        })
        it('should fail on empty password instead of string',() => {

            password = ''

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(Error,'password is empty')
        })
        it('should fail on object password instead of string',() => {

            password = {}

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(TypeError,password + ' is not a string')
        })
        it('should fail on array password instead of string',() => {

            password = []

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(TypeError,password + ' is not a string')
        })
        it('should fail on undefined password instead of string',() => {

            password = undefined

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(TypeError,password + ' is not a string')
        })
        it('should fail on null password instead of string',() => {

            password = null

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(TypeError,password + ' is not a string')
        })
        it('should fail on number username instead of string',() => {

            username = 4
            password = '123'

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(TypeError,username + ' is not a string')
        })
        it('should fail on boolean username instead of string',() => {

            username = true

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(TypeError,username + ' is not a string')
        })
        it('should fail on object username instead of string',() => {

            username = {}

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(TypeError,username + ' is not a string')
        })
        it('should fail on array username instead of string',() => {

            username = []

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(TypeError,username + ' is not a string')
        })
        it('should fail on null username instead of string',() => {

            username = null

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(TypeError,username + ' is not a string')
        })
        it('should fail on undefined username instead of string',() => {

            username = undefined

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(TypeError,username + ' is not a string')
        })
        it('should fail on empty username instead of string',() => {

            username = ''

            expect(() => 
                userApi.authenticate(username, password)
            ).to.throw(Error,'username is empty')
        })
    })

    describe('retrieve', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let username
        let password
        let passwordConfirm = '123'

        let _id, _token

        beforeEach(() => {
            username = `manuelbarzi-${Math.random()}`
            password = '123'

            return userApi.register(name, surname, username, password, passwordConfirm)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        })

        it('should succeed on correct data', () =>
            userApi.retrieve(_id, _token)
                .then(user => {
                    expect(user.id).to.equal(_id)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.username).to.equal(username)
                })
        )
        it('should fail on empty token instead of string',() => {

            _token = ''

            expect(() => 
                userApi.retrieve(_id, _token)
            ).to.throw(Error, 'token is empty')
        })
        it('should fail on object token instead of string',() => {

            _token = {}

            expect(() => 
                userApi.retrieve(_id, _token)
            ).to.throw(TypeError, `${_token} is not a string`)
        })
        it('should fail on boolean token instead of string',() => {

            _token = true

            expect(() => 
                userApi.retrieve(_id, _token)
            ).to.throw(TypeError, `${_token} is not a string`)
        })
        it('should fail on number token instead of string',() => {

            _token = 4

            expect(() => 
                userApi.retrieve(_id, _token)
            ).to.throw(TypeError, `${_token} is not a string`)
        })
        it('should fail on undefined token instead of string',() => {

            _token = undefined

            expect(() => 
                userApi.retrieve(_id, _token)
            ).to.throw(TypeError, `${_token} is not a string`)
        })
        it('should fail on null token instead of string',() => {

            _token = null

            expect(() => 
                userApi.retrieve(_id, _token)
            ).to.throw(TypeError, `${_token} is not a string`)
        })
        it('should fail on empty id instead of string',() => {

            _id = ''

            expect(() => 
                userApi.retrieve(_id, _token)
            ).to.throw(Error, `id is empty`)
        })
        it('should fail on object id instead of string',() => {

            _id = {}

            expect(() => 
                userApi.retrieve(_id, _token)
            ).to.throw(TypeError, `${_id} is not a string`)
        })
        it('should fail on boolean id instead of string',() => {

            _id = true

            expect(() => 
                userApi.retrieve(_id, _token)
            ).to.throw(TypeError, `${_id} is not a string`)
        })
        it('should fail on undefined id instead of string',() => {

            _id = undefined

            expect(() => 
                userApi.retrieve(_id, _token)
            ).to.throw(TypeError, `${_id} is not a string`)
        })
        it('should fail on null id instead of string',() => {

            _id = null

            expect(() => 
                userApi.retrieve(_id, _token)
            ).to.throw(TypeError, `${_id} is not a string`)
        })
        it('should fail on array id instead of string',() => {

            _id = []

            expect(() => 
                userApi.retrieve(_id, _token)
            ).to.throw(TypeError, `${_id} is not a string`)
        })
    })

    describe('update', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let username
        let password = '123'
        let passwordConfirm = password
        let data = { name: 'Pepito', surname: 'Grillo', age: 32 }
        
        let _id, _token
        
        beforeEach(() => {
            username = `manuelbarzi-${Math.random()}`

            return userApi.register(name, surname, username, password, passwordConfirm)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        })

        it('should succeed on correct data', () => {

            return userApi.update(_id, _token, data)
                .then(() => userApi.retrieve(_id, _token))
                .then(user => {
                    expect(user.id).to.equal(_id)
                    expect(user.name).to.equal(data.name)
                    expect(user.surname).to.equal(data.surname)
                    expect(user.age).to.equal(data.age)
                    expect(user.username).to.equal(username)
                })
        })

        it('should fail on non-existing id',() => {

            const testToken = '123123sadnauybdas123ybajdn21i38612usdasdiuhi213' 
            userApi.update(_id, testToken, data)
             .then(() => {
                 throw Error('should not have passed by here')
             })
             .catch(error => {
                expect(error.message).to.equal(`invalid token`)
             })
        })
        it('should fail on number token instead of string',() => {

            _token = 4

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${_token} is not a string`)
        })
        it('should fail on boolean token instead of string',() => {

            _token = true

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${_token} is not a string`)
        })
        it('should fail on object token instead of string',() => {

            _token = {}

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${_token} is not a string`)
        })
        it('should fail on array token instead of string',() => {

            _token = []

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${_token} is not a string`)
        })
        it('should fail on undefined token instead of string',() => {

            _token = undefined

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${_token} is not a string`)
        })
        it('should fail on null token instead of string',() => {

            _token = null

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${_token} is not a string`)
        })
        it('should fail on empty token instead of string',() => {

            _token = ''

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(Error,`token is empty`)
        })
        it('should fail on object id instead of string',() => {

            _id = {}

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${_id} is not a string`)
        })
        it('should fail on array id instead of string',() => {

            _id = []

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${_id} is not a string`)
        })
        it('should fail on number id instead of string',() => {

            _id = 4

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${_id} is not a string`)
        })
        it('should fail on undefined id instead of string',() => {

            _id = undefined

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${_id} is not a string`)
        })
        it('should fail on null id instead of string',() => {

            _id = null

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${_id} is not a string`)
        })
        it('should fail on empty id instead of string',() => {

            _id = ''

            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(Error,`id is empty`)
        })
        it('should fail on string data instead of object',() => {

            data = 'test'
            
            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${data} is not an object`)
        })
        it('should fail on number data instead of object',() => {

            data = 4
            
            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${data} is not an object`)
        })
        it('should fail on boolean data instead of object',() => {

            data = true
            
            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${data} is not an object`)
        })
        it('should fail on undefined data instead of object',() => {

            data = undefined
            
            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${data} is not an object`)
        })
        it('should fail on null data instead of object',() => {

            data = null
            
            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(TypeError,`${data} is not an object`)
        })
        it('should fail on empty data instead of object',() => {

            data = ''
            
            expect(() => 
                userApi.update(_id, _token, data)
            ).to.throw(Error,`${data} is not an object`)
        })
    })

    describe('remove', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let username
        let password
        let passwordConfirm = '123'

        let _id, _token

        beforeEach(() => {
            username = `manuelbarzi-${Math.random()}`
            password = '123'

            return userApi.register(name, surname, username, password, passwordConfirm)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        })

        it('should succeed on correct data', () => {
            return userApi.remove(_id, _token, username, password)
                .then(() => userApi.retrieve(_id, _token))
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(error => expect(error.message).to.equal(`user with id \"${_id}\" does not exist`))
        })
        it('should fail on non-matching token',() => {

            const testToken = '123123sadnauybdas123ybajdn21i38612usdasdiuhi213' 
            userApi.remove(_id, testToken, username, password)
             .then(() => {
                 throw Error('should not have passed by here')
             })
             .catch(error => {
                expect(error.message).to.equal(`invalid token`)
             })
        })
        it('should fail on number id instead of string',() => {
            
            _id = 4

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,_id + ' is not a string')
        })
        it('should fail on boolean id instead of string',() => {
            
            _id = true

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,true + ' is not a string')
        })
        it('should fail on object id instead of string',() => {
            
            _id = {}

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,_id + ' is not a string')
        })
        it('should fail on array id instead of string',() => {
            
            _id = []

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,_id + ' is not a string')
        })
        it('should fail on undefined id instead of string',() => {
            
            _id = undefined

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,_id + ' is not a string')
        })
        it('should fail on null id instead of string',() => {
            
            _id = null

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,_id + ' is not a string')
        })
        it('should fail on undefined token instead of string',() => {
            
            _token = undefined

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,_token + ' is not a string')
        })
        it('should fail on null token instead of string',() => {
            
            _token = null

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,_token + ' is not a string')
        })
        it('should fail on object token instead of string',() => {
            
            _token = {}

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,_token + ' is not a string')
        })
        it('should fail on number token instead of string',() => {
            
            _token = 4

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,_token + ' is not a string')
        })
        it('should fail on boolean token instead of string',() => {
            
            _token = true

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,_token + ' is not a string')
        })
        it('should fail on number password instead of string',() => {
            
            password = 123123

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,password + ' is not a string')
        })
        it('should fail on empty password',() => {
            
            password = ''

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(Error,'password is empty')
        })
        it('should fail on boolean password instead of string',() => {
            
            password = true

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,password + ' is not a string')
        })
        it('should fail on array password instead of string',() => {
            
            password = []

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,password + ' is not a string')
        })
        it('should fail on object password instead of string',() => {
            
            password = {}

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,password + ' is not a string')
        })
        it('should fail on null password instead of string',() => {
            
            password = null

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,password + ' is not a string')
        })
        it('should fail on undefined password instead of string',() => {
            
            password = undefined

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,password + ' is not a string')
        })
        it('should fail on number username instead of string',() => {
            
            username = 4

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,`${username} is not a string`)
        }) 
        it('should fail on null username instead of string',() => {
            
            username = null

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,`${username} is not a string`)
        }) 
        it('should fail on undefined username instead of string',() => {
            
            username = undefined

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,`${username} is not a string`)
        }) 
        it('should fail on boolean username instead of string',() => {
            
            username = true

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,`${username} is not a string`)
        }) 
        it('should fail on array username instead of string',() => {
            
            username = []

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,`${username} is not a string`)
        }) 
        it('should fail on object username instead of string',() => {
            
            username = {}

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(TypeError,`${username} is not a string`)
        })
        it('should fail on empty username instead of string',() => {
            
            username = ''

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).to.throw(Error,`username is empty`)
        }) 
    })
})