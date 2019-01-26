const logic = {
    /**
     * 
     * @param {string} email 
     * @param {password} password 
     * @param {function} callback 
     */
    login: function (email, password, callback) {
        var user = users.find(function (user) {
            return user.email === email
        })

        if (user.password !== password) throw Error ('wrong password')

        var loggedInUser = {
            name: user.name,
            surname: user.surnam,
            email: user.email
        }
        callback(loggedInUser)
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
    register: function (name, surname, email, password, passwordConfirm, callback) {
        var user = users.find(function (user) {
            return user.email === email
        })

        if (user) throw Error (user + 'already exists')

        if (password !== passwordConfirm) throw Error ("passwords don't match")

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        })

        callback()
    },
    /**
     * Searches for artists
     * @param {*} query 
     * @param {*} callback 
     */
    searchArtists(query, callback) {
        if (typeof query !== 'string') throw TypeError (`${query} is not a string`)

        if (!(query.trim().length)) throw Error ('query is empty')

        if (typeof callback !== 'function') throw TypeError (`${callback} is not a function`)

        spotifyApi.searchArtists(query, callback)
    },

    retrieveAlbums(artistId, callback) {
        if (typeof artistId !== 'string') throw TypeError (`${artistId} is not a string`)

        if (!(artistId.trim().length)) throw Error ('query is empty')

        if (typeof callback !== 'function') throw TypeError (`${callback} is not a function`)

        spotifyApi.retrieveAlbums(artistId, callback)
    },

    retrieveTracks(albumId, callback) {
        if (typeof albumId !== 'string') throw TypeError (`${albumId} is not a string`)

        if (!(albumId.trim().length)) throw Error ('query is empty')

        if (typeof callback !== 'function') throw TypeError (`${callback} is not a function`)

        spotifyApi.retrieveTracks(albumId, callback)
    },

    retrieveSong(id, callback) {
        if (typeof id !== 'string') throw TypeError (`${id} is not a string`)

        if (!(id.trim().length)) throw Error ('query is empty')

        if (typeof callback !== 'function') throw TypeError (`${callback} is not a function`)

        spotifyApi.retrieveSong(id, callback)
    }
}