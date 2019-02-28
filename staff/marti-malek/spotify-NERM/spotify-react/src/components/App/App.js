import React, { Component } from 'react';
import Login from '../Login'
import Register from '../Register'
import Search from '../Search'
import Artists from '../Artists'
import Albums from '../Albums'
import Tracks from '../Tracks'
import Song from '../Song'
import logic from '../../logic/logic'
import Favourite from '../Favourites'
import '../Search/index.sass'

class App extends Component {
    state = { loginFeedback: '', registerFeedback: '', searchFeedback: '', userEmail: '', registerVisible: false, loginVisible: true, searchVisible: false, artistsVisible: false, albumsVisible: false, tracksVisible: false, songVisible: false, favouriteVisible: false, artists: [], albums: [], tracks: [], song: {}, popover: [], favouriteTracks: [], user: {}, userToken: null, isLiked: false, trackId: null, trackComments: [] }

    toggleHidden = () => {
        this.setState({
            registerVisible: false,
            loginVisible: true
        })
    }


    handleLogout = () => {
        this.setState({
            searchVisible: false,
            artistsVisible: false,
            albumsVisible: false,
            tracksVisible: false,
            songVisible: false,
            loginVisible: true
        })
    }

    handleAlbumsBack = () => {
        this.setState({
            albumsVisible: false,
            artistsVisible: true
        })
    }

    handleTracksBack = () => {
        this.setState({
            tracksVisible: false,
            albumsVisible: true
        })
    }

    handleSongBack = () => {
        this.setState({
            songVisible: false,
            tracksVisible: true
        })
    }

    handleFavsBack = () => {
        this.setState({
            favouriteVisible: false,
            searchVisible: true
        })
    }

    loginHidden = () => {
        this.setState({
            loginVisible: false,
            registerVisible: true
        })
    }

    handleSearch = (query) => {
        try {
            logic.searchArtists(query)
                .then(artists => {
                    this.setState({ artistsVisible: true, artists })
                })
            this.setState({ searchFeedback: '' })
        } catch ({ message }) {
            this.setState({ searchFeedback: message, artistsVisible: false, albumsVisible: false, tracksVisible: false, songVisible: false })
        }
    }
    handleAlbum = (artistId) => {
        try {
            logic.retrieveAlbums(artistId)
                .then(albums => this.setState({ albumsVisible: true, artistsVisible: false, albums }))
        } catch (error) {
            console.error(error)
        }

    }
    handleTrack = (albumId) => {
        try {
            logic.retrieveTracks(albumId)
                .then(tracks => {
                    this.setState({ albumsVisible: false, tracksVisible: true, tracks })
                })
                .catch((err) => {
                    console.error(err)
                })
        } catch ({ message }) {
            console.error(message)
        }
    }
    handleSong = (trackId) => {
        if (trackId !== undefined) this.setState({ trackId: trackId })
        const { state: { userToken, user } } = this
        try {
            Promise.all([
                logic.retrieveSong(trackId),
                logic.retrieveUser(user.id, userToken),
                logic.listCommentsFromTrack(trackId)
            ])
                .then(([song, { favoriteTracks }, trackComments]) => {
                    song.isFavorite = favoriteTracks.includes(trackId)
                    this.setState({ tracksVisible: false, songVisible: true, song, trackComments })
                })
        } catch ({ message }) {
            console.error(message)
        }
    }


    handleRegister = (name, surname, email, password, passwordConfirm) => {
        try {
            logic.register(name, surname, email, password, passwordConfirm)
                .then(() => {
                    console.log('You have been successfully registered')
                    this.setState({ registerFeedback: '', loginVisible: true, registerVisible: false })
                })
                .catch(error => this.setState({ registerFeedback: error.message }))
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    handleArtistsBack = () => {
        this.setState({ artistsVisible: false })
    }

    handleLogin = (email, password) => {
        try {
            logic.login(email, password)
                .then(({ id, token }) => {
                    this.setState({ userToken: token })
                    return logic.retrieveUser(id, token)
                })
                .then(user => {
                    this.setState({ loginFeedback: '', user: user })
                    this.setState({
                        loginVisible: false,
                        searchVisible: true
                    })
                })
                .catch(error => this.setState({loginFeedback: error.message}))
            /* this.setState({user: user, userEmail: user.email}) */

        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }
    handleFavourite = () => {
        const { state: { user: { id }, userToken, trackId } } = this

        logic.toggleFavourite(id, userToken, trackId)
            .then(() => this.handleSong(trackId))
    }

    handleFavourites = () => {
        this.setState({
            searchVisible: false,
            artistsVisible: false,
            albumsVisible: false,
            tracksVisible: false,
            loginVisible: false,
            favouriteVisible: true
        })
    }

    handleAddCommentToTrack = (trackId, text) => {
        const { state: { user, userToken } } = this

        return logic.addCommentToTrack(user.id, text, trackId, userToken)
            .then(() => logic.listCommentsFromTrack(trackId))
            .then(trackComments => this.setState({ trackComments }))
    }

    handleDeleteComment = (commentId, trackId) => {
        const { state: { user, userToken } } = this

        return logic.deleteCommentFromTrack(commentId, user.id, trackId, userToken)
            .then(() => this.handleSong(trackId))
    }

    render() {

        const { state: { artists, albums, tracks, song, user, favouriteTracks, loginFeedback, registerFeedback, searchFeedback, registerVisible, loginVisible, searchVisible, artistsVisible, albumsVisible, tracksVisible, songVisible, favouriteVisible, trackComments }, handleLogin, handleAddCommentToTrack, handleRegister, handleSearch, handleAlbum, handleTrack, handleSong, handleArtistsBack, handleLogout, handleAlbumsBack, handleTracksBack, handleSongBack, handleFavourite, handleFavourites, handleFavsBack, handleCheckFavs, handleDeleteComment } = this

        return <main className="app">
            {loginVisible && <Login onLogin={handleLogin} onToRegister={this.loginHidden} feedback={loginFeedback} />}
            {registerVisible && <Register onRegister={handleRegister} onToLogin={this.toggleHidden} feedback={registerFeedback} />}
            {searchVisible && <Search onSearch={handleSearch} feedback={searchFeedback} logOut={handleLogout} goToFavourites={handleFavourites} />}
            {artistsVisible && <Artists artists={artists} onArtist={handleAlbum} goArtistsBack={handleArtistsBack} />}
            {albumsVisible && <Albums albums={albums} onAlbum={handleTrack} goAlbumsBack={handleAlbumsBack} />}
            {tracksVisible && <Tracks tracks={tracks} onTrack={handleSong} goTracksBack={handleTracksBack} />}
            {songVisible && <Song song={song} deleteCommentFromTrack={handleDeleteComment} actualUserId={user.id} favouriteTracks={favouriteTracks} trackComments={trackComments} addCommentToTrack={handleAddCommentToTrack} goSongBack={handleSongBack} addFavourite={handleFavourite} checkFavs={handleCheckFavs} user={user} />}
            {favouriteVisible && <Favourite favouriteTracks={favouriteTracks} onTrackClick={handleSong} goFavsBack={handleFavsBack} />}

        </main>
    }
}

export default App;
