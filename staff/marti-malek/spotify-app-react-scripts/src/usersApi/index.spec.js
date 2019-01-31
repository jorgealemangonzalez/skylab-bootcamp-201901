'use strict'

import userApi from '.'

describe('user api', () => {
    const name = 'manuel'
    const surname = 'barzi'
    const email = `manuelbarzi-${Math.random()}`
    const password = '123'

    const testToken = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTMwM2Q4NjY3ZmYyMDAwOWU1NGYxOSIsImlhdCI6MTU0ODk1MjkyNiwiZXhwIjoxNTQ4OTU2NTI2fQ.6XkkReIcOqUa6Wnou9KPqhm8b3CnNXSOfFL1frttDuM'
    const testId = '5c5303d8667ff20009e54f19'

    const favourites = ['a','b','c']
    const favourites2 = ['a','b','c']
    
    describe('register', () => {
        it('should succeed on correct data', () =>
        userApi.register(name, surname, email, password, password)
        .then(id => expect(id).toBeDefined())
        .catch(error => expect(error).toBeUndefined())
        )
        it('should fail on already existing user', () =>
        userApi.register(name, surname, email, password, password)
        .then(() => {
            throw Error('should not have passed by here')
        })
        .catch(error => {
            expect(error).toBeDefined()
            expect(error.message).toBe(`user with username \"${email}\" already exists`)
        })
        )
    })
    describe('login', () => {
        it('should succeed on correct data', () =>
        userApi.login(email, password)
        .then(data => {
            expect(data.id).toBeDefined()
            expect(data.token).toBeDefined()
        })
        .catch(error => expect(error).toBeUndefined())
        )
        
        it('should fail on non-existing user', () =>
        userApi.login('johndoe@mail.com', password)
        .then(() => {
            throw Error('should not have passed by here')
        })
        .catch(error => {
            expect(error).toBeDefined()
            expect(error.message).toBe(`user with username \"johndoe@mail.com\" does not exist`)
        })
        )
    })
    describe('retrieve', () => {
        it('should succeed correct data', () => {
            userApi.retrieve(testId,testToken)
            .then(data => {
                expect(data.id).toBeDefined()
                expect(data.username).toBeDefined()
            })
            .catch(error => expect(error).toBeUndefined())
        })
        it('should fail on invalid token', () => {
            userApi.login(email, password)
                .then((data) =>
                    userApi.retrieve(data.id, data.token)
                    .then(() => {
                        throw Error('should not have passed by here')
                    })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe(`hola Oriol`)
                    })
                )           
        })
    })
    describe('update', () => {
        it('should succeed with correct data', () => {
            userApi.login(email, password)
                .then((data) =>
                    userApi.update(data.id, data.token, favourites)
                        .then(user => {
                            expect(user.id).toBeDefined()
                            expect(user.username).toBeDefined()
                            expect(user.favourites).toBe(['a','b','c'])
                        })
                        .catch(error => expect(error).toBeUndefined())
                )
        })
        it('should succeed with many data', () => {
            userApi.login(email, password)
                .then((data) =>
                    userApi.update(data.id, data.token, favourites, favourites2)
                        .then(user => {
                            expect(user.id).toBeDefined()
                            expect(user.username).toBeDefined()
                            expect(user.favourites).toBe(['a','b','c'])
                            expect(user.favourites2).toBe(['a','b','c'])
                        })
                        .catch(error => expect(error).toBeUndefined())
                )
        })
    })
    describe('remove', () => {
        it('should succeed with correct data', () => {
            userApi.login(email, password)
            .then((data) =>
            userApi.remove(data.id, data.token)
                .then(user => {
                    expect(user.id).toBeUndefined()
                    expect(user.username).toBeUndefined()
                })
                .catch(error => expect(error).toBeUndefined())
        )    
        })
    })
})