'use strict'

const userApi = {
    register(name, surname, email, password, passwordConfirm) {

        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        if (password.toString() !== passwordConfirm.toString()) throw Error ("passwords don't match")

        return fetch('https://skylabcoders.herokuapp.com/api/user', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            }, 
            body: JSON.stringify({ name, surname, username: email, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response

                if (status === 'OK') return response.data.id
                else throw Error(response.error)
            })
    },
    login(email, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch('https://skylabcoders.herokuapp.com/api/auth', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            }, 
            body: JSON.stringify({username: email, password })
        })
        .then(response => response.json())
        .then(response => {
            const { status } = response

            if (status === 'OK') return response.data
            else throw Error(response.error)
        })
    },
    retrieve(id,token) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        .then(response => response.json())
        .then(response => {
            const { status } = response

            if (status === 'OK') return response.data
            else throw Error(response.error)
        })
    },
    update(id, token) {
        var items = arguments.slice(2)
        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({items})
        })
        .then(response => response.json())
        .then(response => {
            const { status } = response

            if (status === 'OK') return response
            else throw Error(response.error)
        })
    } ,
    remove(id, token, email, password) {
        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, {
            method: 'DEL',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({username: email, password })
        })
        .then(response => response.json())
        .then(response => {
            const { status } = response

            if (status === 'OK') return response.data
            else throw Error(response.error)
        })
    }
}

export default userApi