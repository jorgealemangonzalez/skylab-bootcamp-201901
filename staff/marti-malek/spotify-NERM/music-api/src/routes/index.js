module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    searchArtists: require('./search-artists'),

    addCommentToArtist: require('./add-comment-to-artist'),

    listCommentsFromArtist: require('./list-comments-from-artist'),

    updateUser: require('./update-user'),

    retrieveArtist: require('./retrieve-artist'),

    toggleFavouriteArtist: require('./toggle-favourite-artist'),

    retrieveAlbum: require('./retrieve-album'),

    retrieveTracks: require('./retrieve-tracks'),

    retrieveTrack: require('./retrieve-track'),

    notFound: require('./not-found')
}