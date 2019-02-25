import users from '../data'
import musicApi from '../musicApi'

/**
 * Abstraction of business logic.
 */
const logic = {
    /**
     * 
     * Toggles between pushing and deleting an id of a song to the array of favourite songs.
     * 
     * @param {string} id 
     * @param {string} email 
     * @param {function} callback 
     */
    toggleFavourite(id, email, callback) {
        var user = users.find(function (user) {
            return user.email === email
        })


        if (user.favourites.includes(id)) {
            const position = user.favourites.indexOf(id)

            user.favourites.splice(position, 1)
            console.log(user.favourites)
        } else {
            user.favourites.push(id)
            console.log(user.favourites)
        }
        callback()
    },
    /**
     * 
     * Logs In a user by it's credentials.
     * 
     * @param {string} email 
     * @param {password} password 
     * @param {function} callback 
     */
    login: function (email, password) {

        if (typeof email !== 'string') throw TypeError('email ' + email + ' should be a string')

        return musicApi.authenticate(email, password)

        // var user = users.find(function (user) {
        //     return user.email === email
        // })

        // if (!user) throw Error('user ' + email + ' not found');

        // if (user.password !== password) throw Error ('wrong password')
        // if (user.email !== email) throw Error ('user ' + email + ' not found')

        // var loggedInUser = {
        //     name: user.name,
        //     surname: user.surname,
        //     email: user.email,
        //     favourite: user.favourites
        // }
        // callback(loggedInUser)
    },
    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * @param {string} passwordConfirm 
     * @param {function} callback 
     */
    register: function (name, surname, email, password, passwordConfirm) {

        if (typeof name !== 'string') throw TypeError(name + ' is not a string');

        if (!name.trim().length) throw Error('name cannot be empty');

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string');

        if (!surname.trim().length) throw Error('surname cannot be empty');

        if (typeof email !== 'string') throw TypeError(email + ' is not a string');

        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');

        if (!password.trim().length) throw Error('password cannot be empty');

        if (typeof passwordConfirm !== 'string') throw TypeError(passwordConfirm + ' is not a string');

        if (!passwordConfirm.trim().length) throw Error('password confirmation cannot be empty');

        return musicApi.register(name, surname, email, password, passwordConfirm)

        // var user = users.find(function (user) {
        //     return user.email === email
        // })

        // if (user) throw Error (user + 'already exists')

        // if (password !== passwordConfirm) throw Error ("passwords don't match")

        // users.push({
        //     name: name,
        //     surname: surname,
        //     email: email,
        //     password: password,
        //     favourites: []
        // })

        // callback()
    },
    /**
     * Searches for artists.
     * 
     * @param {string} query - The search criteria
     * @param {function} callback - The expression to evaluate on response
     */
    searchArtists(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!(query.trim().length)) throw Error('query is empty')

        /* if (typeof callback !== 'function') throw TypeError (`${callback} is not a function`) */

        return musicApi.searchArtists(query)
            .then(artists => {
                console.log(artists)
                return artists
            })
    },
    /**
     * 
     * Retrieves the albums of an artist from the api.
     * 
     * @param {string} artistId - Id of the artist
     */
    retrieveAlbums(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!(artistId.trim().length)) throw Error('query is empty')

        return musicApi.retrieveAlbums(artistId)
    },
    /**
     * 
     * Retrieves the tracks in one album from the api.
     * 
     * @param {string} albumId - Id of the album
     */
    retrieveTracks(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!(albumId.trim().length)) throw Error('query is empty')

        return musicApi.retrieveTracks(albumId)
    },
    /**
     * 
     * Retrieves all the songs contained in an album from the api
     * 
     * @param {string} id - Id of the song
     * @param {function} callback 
     */
    retrieveSong(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!(id.trim().length)) throw Error('query is empty')

        return musicApi.retrieveSong(id)
    }
}

export default logic