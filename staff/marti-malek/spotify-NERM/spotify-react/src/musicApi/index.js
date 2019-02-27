'use strict'

const musicApi = {
    url: 'http://localhost:8000/api',

    register(name, surname, email, password, passwordConfirm) {

        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        /* if (password.toString() !== passwordConfirm.toString()) throw Error ("passwords don't match") */

        return fetch(this.url + '/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(response => response)
    },
    authenticate(email, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => response)
    },
    retrieve(id, token) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/user/${id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(response => response)
    },
    update(id, token, data) {
        return fetch(this.url + `/user/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => response)
    },
    remove(id, token, email, password) {
        return fetch(`${this.url}/user/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => response)
    },
    toggleFavouriteTrack(userId, token, trackId) {
        return fetch(`${this.url}/track/${trackId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.id.value.favoriteTracks, 'musicApi')
                return response.id.value.favoriteTracks
            })
    },
    /**
     * Searches artists.
     * 
     * @param {string} query - The text to match on search.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */
    searchArtists(query) {

        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        return fetch(`${this.url}/search/${query}`)
            .then(res => res.json())
            .then(res => res)
    },
    /**
     * Retrieves albums of an artist
     * @param {string} artistId 
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */
    retrieveAlbums(artistId) {

        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return fetch(`${this.url}/artist/${artistId}`)
            .then(res => res.json())
            .then(res => res)
    },
    /**
     * Retrieves tracks of an album
     * @param {string} albumId 
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */
    retrieveTracks(albumId) {

        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return fetch(`${this.url}/album/${albumId}`) // change of url to this.url!!!
            .then(res => res.json())
    },
    /**
     * Retrieves song of a track
     * @param {string} artistId 
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */
    retrieveSong(id) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw Error('id is empty')

        return fetch(`${this.url}/track/${id}`)
            .then(res => res.json())
    },
    /**
     * 
     * Adds a comment to an artist.
     * 
     * @param {string} trackId 
     */
    addCommentToTrack(userId, text, trackId, token) {

        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

        if (!trackId.trim().length) throw Error('trackId is empty')

        return fetch(`${this.url}/track/${trackId}/comment`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ userId, text })
        })
            .then(res => res.json())
    },
    /**
     * 
     * Adds a comment to an artist.
     * 
     * @param {string} trackId 
     */
    listCommentsFromTrack(trackId) {

        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

        if (!trackId.trim().length) throw Error('trackId is empty')

        return fetch(`${this.url}/track/${trackId}/comment`)
            .then(res => res.json())
    }
}

export default musicApi