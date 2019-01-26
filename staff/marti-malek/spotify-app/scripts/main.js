spotifyApi.token= 'BQDN0bkJGusqY2xdkubZo3WiESsCp053dl6wHMYjbJ9yILUAEifGfQCpdEN6H_dqaSCmLnj0grgxVF6v0Tm527f7Sx642stHpo4wfZCyWfBC-9-jXYix796tw88hwcX50hyvEa4imgOPNZidEyuMxDc7Y6wsREynfw'

const loginPanel = new LoginPanel
const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumsPanel = new AlbumsPanel
const tracksPanel = new TracksPanel
const songPanel = new SongPanel
const errorPanel = new ErrorPanel

const $root = $('#root')

searchPanel.hide()
artistsPanel.hide()
albumsPanel.hide()
tracksPanel.hide()
songPanel.hide()
errorPanel.hide()

$root.append(loginPanel.$container)
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
