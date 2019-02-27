'use strict'

require('dotenv').config()

const spotifyApi = require('../spotify-api')
const users = require('../data/users')
const trackComments = require('../data/track-comments')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/**
 * Abstraction of business logic.
 */
const logic = {
    jwtSecret: null,
    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    * 
    * @throws {Error} - On empty params
    * @throws {TypeError} - On incorrect data type
    */
    registerUser(name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return users.findByEmail(email)
            .then(user => {
                if (user) throw Error(`user with email ${email} already exists`)

                return bcrypt.hash(password, 10)
            })
            .then(hash => users.add({ name, surname, email, password: hash }))
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @throws {Error} - On empty params
     * @throws {TypeError} - On incorrect data type
     */
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')
        
        return users.findByEmail(email)
            .then(user => {
                if (!user) throw Error(`user with email ${email} not found`)
                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw Error('Error in credentials')
                        // if (user.password !== password) throw Error('wrong credentials')
                        const userId = user.id
                        const secret = this.jwtSecret

                        const token = jwt.sign({
                            data: userId
                        }, secret, { expiresIn: '48h' })
                        return { id: userId, token }
                    })
            })
    },
    /**
     * 
     * Retrieves the user from it's id.
     * 
     * @param {string} userId 
     * @param {string} token 
     * 
     * @throws {Error} - On empty params
     * @throws {TypeError} - On incorrect data type
     */
    retrieveUser(userId, token) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof token !== 'string') throw TypeError(token + ' is not a string')

        if (!token.trim().length) throw Error('token cannot be empty')

        if (jwt.verify(token, this.jwtSecret).data !== userId) throw Error('Incorrect token')

        return users.findByUserId(userId)
            .then(({ id, name, surname, email, favoriteArtists = [], favoriteAlbums = [], favoriteTracks = [] }) => ({
                id: id.toString(),
                name,
                surname,
                email,
                favoriteArtists,
                favoriteAlbums,
                favoriteTracks
            }))
    },
    /**
     * 
     * Updates a user data from it's id, validating token.
     * 
     * @param {string} userId 
     * @param {string} token 
     * @param {object} data 
     * 
     * @throws {Error} - On empty params
     * @throws {TypeError} - On incorrect data type
     */
    updateUser(userId, token, data) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!data) throw Error('data should be defined')

        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        if (jwt.verify(token, this.jwtSecret).data !== userId) throw Error('Incorrect token')

        return users.update(userId, data)

    },
    /**
     * 
     * Removes a user from DB by it's id, validating token.
     * 
     * @param {string} userId 
     * @param {string} token 
     * 
     * @throws {Error} - On empty params
     * @throws {TypeError} - On incorrect data type
     */
    removeUser(userId, token) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (jwt.verify(token, this.jwtSecret).data !== userId) throw Error('Incorrect token')

        return users.remove(userId)
    },


    /**
     * Search artists.
     * 
     * @param {string} query 
     * @returns {Promise}
     * 
     * @throws {Error} - On empty params
     * @throws {TypeError} - On incorrect data type 
     */
    searchArtists(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        return spotifyApi.searchArtists(query)
    },

    /**
     * Retrieves an artist.
     * 
     * @param {string} artistId 
     * 
     * @throws {Error} - On empty params
     * @throws {TypeError} - On incorrect data type
     */
    retrieveArtist(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return spotifyApi.retrieveArtist(artistId)
            .then(artist => {
                return trackComments.find({ artistId: artist.id })
                    .then(comments => {
                        artist.comments = comments
                        return artist
                    })
            })
    },

    /**
     * Toggles a artist from non-favorite to favorite, and viceversa.
     * 
     * @param {string} artistId - The id of the artist to toggle in favorites.
     * 
     * @throws {Error} - On empty params
     * @throws {TypeError} - On incorrect data type
     */
    toggleFavoriteArtist(userId, token, artistId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} should be a string`)

        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (typeof artistId !== 'string') throw TypeError(`${artistId} should be a string`)

        if (!artistId.trim().length) throw Error('artistId cannot be empty')

        if (jwt.verify(token, this.jwtSecret).data !== userId) throw Error('Incorrect token')

        return users.findByUserId(userId)
            .then(user => {
                const { favoriteArtists = [] } = user

                const index = favoriteArtists.findIndex(_artistId => _artistId === artistId)

                if (index < 0) favoriteArtists.push(artistId)
                else favoriteArtists.splice(index, 1)

                return users.update(userId, { favoriteArtists })
            })
    },

    addCommentToArtist(userId, token, artistId, text) {
        // TODO validate userId, token, artistId and text

        if (typeof userId !== 'string') throw TypeError(`userId should be a string`)

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (jwt.verify(token, this.jwtSecret).data !== userId) throw Error('Incorrect token')

        if (typeof artistId !== 'string') throw TypeError(`artistId should be a string`)

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        const comment = {
            userId,
            artistId,
            text,
            date: new Date
        }

        return users.findByUserId(userId)
            .then(() => artistComments.add(comment))
            .then(() => comment.id)
    },

    addCommentToTrack(userId, token, trackId, text) {
        // TODO validate userId, token, trackId and text

        if (typeof userId !== 'string') throw TypeError(`userId should be a string`)

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (jwt.verify(token, this.jwtSecret).data !== userId) throw Error('Incorrect token')

        if (typeof trackId !== 'string') throw TypeError(`trackId should be a string`)

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        const comment = {
            userId,
            trackId,
            text,
            date: new Date
        }

        return users.findByUserId(userId)
            .then(() => {
                debugger
                return trackComments.add(comment)
            })
            .then(() => comment.id)
    },

    listCommentsFromArtist(artistId) {
        // TODO artistId

        return artistComments.find({ artistId })
    },

    listCommentsFromTrack(trackId) {
        // TODO trackId

        return trackComments.find({ trackId })
    },

    deleteCommentFromTrack(userId, commentId, token) {
        // TODO trackId

        if (jwt.verify(token, this.jwtSecret).data !== userId) throw Error('Incorrect token')

        return trackComments.remove(commentId)
    },

    /**
     * Retrieves albums from artist.
     * 
     * @param {string} artistId 
     */
    retrieveAlbums(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveAlbum(albumId)
    },

    /**
     * Retrieves an album.
     * 
     * @param {string} albumId 
     */
    retrieveAlbum(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveAlbum(albumId)
    },

    /**
     * Toggles a album from non-favorite to favorite, and viceversa.
     * 
     * @param {string} albumId - The id of the album to toggle in favorites.
     */
    toggleFavoriteAlbum(userId, token, albumId) {

        //TODO validate
        if (jwt.verify(token, this.jwtSecret).data !== userId) throw Error('Incorrect token')


        return users.findByUserId(userId)
            .then(user => {
                const { favoriteAlbums = [] } = user

                const index = favoriteAlbums.findIndex(_albumId => _albumId === albumId)

                if (index < 0) favoriteAlbums.push(albumId)
                else favoriteAlbums.splice(index, 1)

                return users.update(userId, { favoriteAlbums })
            })
    },

    /**
     * Retrieves tracks from album.
     * 
     * @param {string} albumId 
     */
    retrieveTracks(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveTracks(albumId)
    },

    /**
     * Retrieves track.
     * 
     * @param {string} trackId 
     */
    retrieveTrack(trackId) {
        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

        if (!trackId.trim().length) throw Error('trackId is empty')

        return spotifyApi.retrieveTrack(trackId)
    },

    /**
     * Toggles a track from non-favorite to favorite, and viceversa.
     * 
     * @param {string} trackId - The id of the track to toggle in favorites.
     */
    toggleFavoriteTrack(userId, token, trackId) {

        // TODO validate 
        if (jwt.verify(token, this.jwtSecret).data !== userId) throw Error('Incorrect token')

        return users.findByUserId(userId)
            .then(user => {
                const { favoriteTracks } = user
                
                const index = favoriteTracks.findIndex(_trackId => _trackId === trackId)
                
                if (index < 0) favoriteTracks.push(trackId)
                else favoriteTracks.splice(index, 1)

                return users.update(userId, { favoriteTracks })
            })
    }
}

module.exports = logic