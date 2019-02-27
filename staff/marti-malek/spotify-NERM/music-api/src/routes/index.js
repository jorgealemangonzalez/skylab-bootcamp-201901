module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    searchArtists: require('./search-artists'),

    addCommentToArtist: require('./add-comment-to-artist'),

    addCommentToTrack: require('./add-comment-to-track'),

    listCommentsFromArtist: require('./list-comments-from-artist'),

    listCommentsFromTrack: require('./list-comments-from-track'),

    deleteCommentFromTrack: require('./delete-comment-from-track'),

    updateUser: require('./update-user'),

    retrieveArtist: require('./retrieve-artist'),

    toggleFavouriteTrack: require('./toggle-favourite-track'),

    retrieveAlbum: require('./retrieve-album'),

    retrieveTracks: require('./retrieve-tracks'),

    retrieveTrack: require('./retrieve-track'),

    notFound: require('./not-found')
}