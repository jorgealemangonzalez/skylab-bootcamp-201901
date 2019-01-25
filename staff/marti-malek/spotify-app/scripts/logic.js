const logic = {
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


    //TODO retrieveTrack(id, callback) // endpoint /v1/tracks/{id}
}