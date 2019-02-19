module.exports = {
    register: {
        post: require('./register/post')
    },

    authenticate: {
        post: require('./authenticate/post')
    },

    retrieve: {
        get: require('./retrieve/get')
    },

    // notFound: {
    //     get: require('./not-found/get')
    // }

    searchArtists: {
        get: require('./searchArtists/get')
    },

    retrieveAlbums: {
        get: require('./retrieveAlbums/get')
    },

    retrieveTracks: {
        get: require('./retrieveTracks/get')
    },

    retrieveTrack: {
        get: require('./retrieveTrack/get')
    }
}