'use strict'

import userApi from '.'

describe('user api', () => {
    
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTMwM2Q4NjY3ZmYyMDAwOWU1NGYxOSIsImlhdCI6MTU0OTA1ODI5MywiZXhwIjoxNTQ5MDYxODkzfQ.al8I-yUDrl5zj07M52y9dwohxJfXAAL7pjCWeYcYy7I'
    const testId = '5c5303d8667ff20009e54f19'
    
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
        const name = 'manuel2'
        const surname = 'barzi'
        const email = `manuelbarzi-${Math.random()}`
        const password = '123'
        const nonExistingEmail = 'hello@mail.com'

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
            userApi.authenticate(nonExistingEmail, password)
            .then(() => {
                throw Error('should not have passed by here')
            })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with username \"${nonExistingEmail}\" does not exist`)
            })
        )
    })
    describe('retrieve', () => {
        const name = 'manuel3'
        const surname = 'barzi'
        const email = `manuelbarzi2-${Math.random()}`
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
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )
        it('should succeed with correct data', () => {

            const data = {name: 'Ali', surname: 'Baba', age: 87}

                userApi.update(_id, _token, data)
                    .then(userApi.retrieve(testId,testToken)
                    .then(user => {
                        expect(user.id).toBe(_id)
                        expect(user.name).toBe(data.name)
                        expect(user.surname).toBeDefined(data.surname)
                        expect(user.age).toBe(data.age)
                    })
                    .catch(error => expect(error).toBeUndefined()))
        })
        it('should fail with invalid data', () => {

            const data = {name: 'Ali', surname: 'Baba', age: 87}

                userApi.update('invalidId', _token, data)
                    .then(() => {
                        throw Error('should not have passed by here')
                    })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe(`token id \"${_id}\" does not match user \"invalidId\"`)
                    })
        })
    })
    describe('remove', () => {

        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed with correct data', () => {
                userApi.remove(_id, _token, username, password)
                    .then(userApi.retrieve(_id, _token))
                    .then(() => {
                        throw Error('should not pass by here')
                    })
                    .catch(({message}) => expect(message).toBe(`user withid \"${_id}\" does not exist`))
        })
    })
})