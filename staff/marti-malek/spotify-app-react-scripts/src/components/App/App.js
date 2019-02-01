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
  state = { loginFeedback: '', registerFeedback: '', searchFeedback: '', userEmail: '', registerVisible: false, loginVisible: true, searchVisible: false, artistsVisible: false, albumsVisible: false, tracksVisible: false, songVisible:false, favouriteVisible:false, artists: [], albums: [], tracks: [], song: {}, popover: [], favouriteTracks: [], user: {} }

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
          const artistsList = logic.searchArtists(query)
          artistsList.then(function(artists) {
              this.setState({ artistsVisible: true, artists})
          }.bind(this))
            this.setState({ searchFeedback: '' })
              /* if (error) {
                  console.error(error.message)
                  this.setState({ searchFeedback: error.message })
              } else {
                  this.setState({ artistsVisible: true, artists})
                  this.setState({ searchFeedback: '' })
              } */
      } catch ({message}) {
          this.setState({ searchFeedback: message, artistsVisible: false, albumsVisible: false, tracksVisible: false, songVisible: false })
      }
  }
  handleAlbum = (artistId) => {
      try {
          logic.retrieveAlbums(artistId, (error, albums) => {
              if (error) {
                  console.error(error.message)
              } else {
                  this.setState({ albumsVisible: true, artistsVisible: false, albums})
              }
          })
      } catch ({message}) {
          console.error(message)
      }
  }
  handleTrack = (albumId) => {
      try {
          logic.retrieveTracks(albumId, (error, tracks) => {
              if (error) {
                  console.error(error.message)
              } else {
                  this.setState({ albumsVisible: false, tracksVisible: true,tracks})
              }
          })
      } catch ({message}) {
          console.error(message)
      }
  }
  handleSong = (trackId) => {
      try {
          logic.retrieveSong(trackId, (error, song) => {
              if (error) {
                  console.error(error.message)
              } else {
                  this.setState({ tracksVisible: false, songVisible: true, song})
              }
          })
      } catch ({message}) {
          console.error(message)
      }
  }


  handleRegister = (name, surname, email, password, passwordConfirm) => {
      try {
          logic.register(name, surname, email, password, passwordConfirm, () => {
              console.log('You have been successfully registered')

              this.setState({ registerFeedback: '' })
          })
      } catch ({message}) {
          this.setState({ registerFeedback: message })
      }
  }

  handleArtistsBack = () => {
      this.setState({ artistsVisible: false})
  }

  handleLogin = (email, password) => {
      try {
          logic.login(email, password, user => {
              console.log(user)
              /* this.setState({user: user, userEmail: user.email}) */
              this.state.user = user
              this.state.userEmail = user.email

              window.myState = this.state

              this.setState({ loginFeedback: '' })
          })
          this.setState({
              loginVisible: false,
              searchVisible: true
          })
      } catch ({ message }) {
          this.setState({ loginFeedback: message })
      }
  }
  handleFavourite = (id) => {
      const {state: {userEmail, user}} = this

      logic.toggleFavourite(id, userEmail, () => {
        this.setState({favouriteTracks: user.favourite})  
        console.log('Added to favourites')
      })
  }
  
  handleFavourites = () => {
      /* const {state: {favouriteTracks, user}} = this


    try {
        logic.retrieveSong(trackId, (error, song) => {
            if (error) {
                console.error(error.message)
            } else {
                this.setState({})
            }
        })
    } catch ({message}) {
        console.error(message)
    } */

      this.setState({
        searchVisible: false,
        artistsVisible: false,
        albumsVisible: false,
        tracksVisible: false,
        loginVisible: false,
        favouriteVisible: true
      })
  }

  render() {

      const { state : { artists, albums, tracks, song, user, favouriteTracks, loginFeedback, registerFeedback, searchFeedback, registerVisible, loginVisible, searchVisible, artistsVisible, albumsVisible, tracksVisible, songVisible, favouriteVisible }, handleLogin, handleRegister, handleSearch, handleAlbum, handleTrack, handleSong, handleArtistsBack, handleLogout, handleAlbumsBack, handleTracksBack, handleSongBack, handleFavourite, handleFavourites, handleFavsBack } = this

      return <main className="app">
      {loginVisible && <Login onLogin={handleLogin} onToRegister={this.loginHidden} feedback={loginFeedback}/>}
      {registerVisible && <Register onRegister={handleRegister} onToLogin={this.toggleHidden} feedback={registerFeedback}/>}
      {searchVisible && <Search onSearch={handleSearch} feedback={searchFeedback} logOut={handleLogout} goToFavourites={handleFavourites}/>}
      {artistsVisible && <Artists artists={artists} onArtist={handleAlbum} goArtistsBack={handleArtistsBack}/>}
      {albumsVisible && <Albums albums={albums} onAlbum={handleTrack} goAlbumsBack={handleAlbumsBack}/>}
      {tracksVisible && <Tracks tracks={tracks} onTrack={handleSong} goTracksBack={handleTracksBack}/>}
      {songVisible && <Song song={song} goSongBack={handleSongBack} addFavourite={handleFavourite} user={user}/>}
      {favouriteVisible && <Favourite favouriteTracks={favouriteTracks} onTrackClick={handleSong} goFavsBack={handleFavsBack}/>}

      </main>
  }
}

export default App;
