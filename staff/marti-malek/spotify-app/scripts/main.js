spotifyApi.token= 'BQCi8vjtGICqYHZF8A6vGIxooOiBfrfi-Tq44DS6B5xYjB6xLdtQEfeYXMK9uox0jVfSStpu0zow3xDEVysNxRAfGBh2ZNANdpjKcZrd5MOHCgZ09gIzSZ4QbnU2xEWBgvqyq_vF2iD4UWy5PlFZqsHBlupe7GnuGw'

const loginPanel = new LoginPanel
const registerPanel = new RegisterPanel
const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumsPanel = new AlbumsPanel
const tracksPanel = new TracksPanel
const songPanel = new SongPanel
const errorPanel = new ErrorPanel

const $root = $('#root')

registerPanel.hide()
searchPanel.hide()
artistsPanel.hide()
albumsPanel.hide()
tracksPanel.hide()
songPanel.hide()
errorPanel.hide()

$root.append(loginPanel.$container)
$root.append(registerPanel.$container)
$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)
$root.append(albumsPanel.$container)
$root.append(tracksPanel.$container)
$root.append(songPanel.$container)


loginPanel.onLogin = function(email, password) {
    try {
        logic.login(email, password, function(user) {
            loginPanel.hide()
            loginPanel.clear()

            searchPanel.user = user
            searchPanel.show()
        })
    } catch(err) {
        loginPanel.error = err.message
    }
}

loginPanel.onGoToRegister = function() {
    loginPanel.hide()
    loginPanel.clear()

    registerPanel.show()
}

registerPanel.onRegister = function(name, surname, email, password, passwordConfirm) {
    try {
        logic.register(name, surname, email, password, passwordConfirm, function(user) {
            registerPanel.hide()
            registerPanel.clear()

            loginPanel.show()
        })
    } catch(err) {
        registerPanel.error = err.message
    }
}

registerPanel.onGoToLogin = function() {
    registerPanel.hide()
    registerPanel.clear()

    loginPanel.show()
}

searchPanel.onSearch = function(query) {
    artistsPanel.clear()
    albumsPanel.clear()
    tracksPanel.clear()
    songPanel.clear()
    
    searchPanel.errorHide()
    artistsPanel.hide()
    albumsPanel.hide()
    tracksPanel.hide()
    songPanel.hide()

    try {
        logic.searchArtists(query, function(error, artists) {
            if (error) {
                searchPanel.error = error.message

            } else {
                artistsPanel.artists = artists

                artistsPanel.show()
            }
        }) 
    } catch(err) {
        searchPanel.error = err.message
    }
}

artistsPanel.onAlbumSelected = function (id) {
    try {
        logic.retrieveAlbums(id, function (error, album) {
            if (error) console.error(error)
            else {
                artistsPanel.hide()

                albumsPanel.items = album

                albumsPanel.show()
            }
        })
    } catch (err) {
        console.error(err)
    }
}

albumsPanel.onTrackSelected = function (id) {
    try {
        logic.retrieveTracks(id, function (error, track) {
            if (error) console.error(error)
            else {
                albumsPanel.hide()

                tracksPanel.tracks = track

                tracksPanel.show()
            }
        })
    } catch (err) {
        console.error(err)
    }
}

tracksPanel.onSongSelected = function (id) {
    try {
        logic.retrieveSong(id, function (error, song) {
            if (error) console.error(error)
            else{
                tracksPanel.hide()

                const {id, name} = song
                songPanel.song = {id, name}

                songPanel.show()
            }
        })
    } catch(err) {
        console.error(err)
    }
}
