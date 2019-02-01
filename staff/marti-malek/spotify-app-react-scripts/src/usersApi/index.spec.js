'use strict'

import userApi from '.'

describe('user api', () => {
    
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTMwM2Q4NjY3ZmYyMDAwOWU1NGYxOSIsImlhdCI6MTU0OTAxNTcxNiwiZXhwIjoxNTQ5MDE5MzE2fQ.GWZF2cl5rMuXhl6qdluZ4y-5M_rpVg7rRukjXHL1xAc'
    const testId = '5c5303d8667ff20009e54f19'
    
    const favourites = ['a','b','c']
    
    describe('register', () => {
        const name = 'manuel'
        const surname = 'barzi'
        const email = `manuelbarzi-${Math.random()}`
        const password = '123'
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
    describe('authenticate', () => {
        const name = 'manuel'
        const surname = 'barzi'
        const email = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id
        
        beforeEach(() =>
        userApi.register(name, surname, email, password, password)
        .then(id => _id = id)
        )
        it('should succeed on correct data', () => 
            userApi.authenticate(email, password)
            .then(data => {
                expect(data.id).toBe(_id)
                expect(data.token).toBeDefined()
            })
            .catch(error => expect(error).toBeUndefined())
        )
        
        it('should fail on non-existing user', () =>
            userApi.authenticate('johndoe@mail.com', password)
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
        const name = 'manuel'
        const surname = 'barzi'
        const email = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, email, password, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(email, password))
                .then(data => _token = data.token)
        )

        it('should succeed on correct data', () => 
            userApi.retrieve(_id,_token)
            .then(data => {
                expect(data.id).toBe(_id)
                expect(data.username).toBe(email)
            })
            .catch(error => expect(error).toBeUndefined())
        )
        it('should fail on invalid token', () => {
            userApi.retrieve(_id, 'hi')
            .then(() => {
                throw Error('should not have passed by here')
            })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error.message).toBe(`invalid token`)
            })     
        })
    })
    describe('update', () => {
        it('should succeed with correct data', () => {
            return userApi.authenticate(email, password)
                .then((data) =>
                    userApi.update(data.id, data.token, favourites)
                        .then(userApi.retrieve(testId,testToken)
                        .then(data => {
                            expect(data.id).toBeDefined()
                            expect(data.username).toBeDefined()
                            expect(data.favourites).toBeDefined()
                        })
                        .catch(error => expect(error).toBeUndefined()))
                )
        })
        it('should fail with invalid data', () => {
            return userApi.authenticate(email, password)
                .then((data) =>
                    userApi.update('invalidId', data.token, favourites)
                        .then(() => {
                            throw Error('should not have passed by here')
                        })
                        .catch(error => {
                            expect(error).toBeDefined()
                            expect(error.message).toBe(`token id \"${data.id}\" does not match user \"invalidId\"`)
                        })
                )
        })
    })
    describe('remove', () => {
        it('should succeed with correct data', () => {
            return userApi.authenticate(email, password)
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