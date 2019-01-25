spotifyApi.token= 'BQBhM_5FN16ttDSUdJWkmtDbU8tJNSdKXPfA7ypbp_IMfUKneICDM8-vAxMu1ljs5wvxzH2tEBFOyilmgIJZGcsVwV6aFizvTSsbCamk6SZy2-rWY0ARDOshZZh9FdtAL1Nbp2bkGzEJYK6XosbdemwgEu1ppOJ75A'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumsPanel = new AlbumsPanel
const tracksPanel = new TracksPanel
const songPanel = new SongPanel
const errorPanel = new ErrorPanel

const $root = $('#root')

artistsPanel.hide()
albumsPanel.hide()
tracksPanel.hide()
songPanel.hide()
errorPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)
$root.append(albumsPanel.$container)
$root.append(tracksPanel.$container)
$root.append(songPanel.$container)
$root.append(errorPanel.$container)

searchPanel.onSearch = function(query) {
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
