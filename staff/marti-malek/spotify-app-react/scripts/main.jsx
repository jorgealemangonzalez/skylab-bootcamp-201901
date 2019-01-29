spotifyApi.token = 'BQBMpm02EgqYEqLjbFb20AjXmtl7Oezif3G-sjTStF3pQb5SY1Vc3nd3r8Mw0gUp0u0-3N__iqymkKKoln0zohfRolj8Rs4xnh97PWYmYpSWruATKizwpXtvXVyP3Fb4lQWm2ZPf8EZNL7pkYhnww3JAA8VWzIT4DQ'

//#region register

class Register extends React.Component {
    state = { name: '', surname: '', email: '', password: '', passwordConfirm: ''}

    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handlePasswordConfirmInput = event => this.setState({ passwordConfirm: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirm }, props: { onRegister }} = this

        onRegister(name, surname, email, password, passwordConfirm)
    }

    handleOnLogin = event => {
        event.preventDefault()

        const { props: { onToLogin }} = this

        onToLogin()
    }

    render() {
        const { handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmInput, handleFormSubmit, handleOnLogin, props: { feedback } } = this

        return <section className="container-fluid">
        <form onSubmit={handleFormSubmit}>
        <div className="input-group col-12 m-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Name</span>
            </div>
            <input className="form-control mr-3 rainbow" name="name" type="text" placeholder="John" onChange={handleNameInput}></input>
        </div>
        <div className="input-group col-12 m-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Surname</span>
            </div>
            <input className="form-control mr-3 rainbow" name="surname" type="text" placeholder="Doe" onChange={handleSurnameInput}></input>
        </div>
        <div className="input-group col-12 m-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Email</span>
            </div>
            <input className="form-control mr-3 rainbow" name="email" type="email" placeholder="something@example.com" onChange={handleEmailInput}></input>
        </div>
        <div className="input-group col-12 m-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Password</span>
            </div>
            <input className="form-control mr-3 rainbow" name="password" type="password" placeholder="3xampl3" onChange={handlePasswordInput}></input>
        </div>
        <div className="input-group col-12 m-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Confirm Password</span>
            </div>
            <input className="form-control mr-3 rainbow" name="confirm" type="password" placeholder="3xampl3" onChange={handlePasswordConfirmInput}></input>
        </div>
        <button className="btn btn-primary login__btn" type="submit">Register</button>
        <button className="ml-2 btn btn-default" onClick={handleOnLogin}>Log In</button>
        </form>
        
        {feedback && <Feedback message={feedback} level=""/>}
        
        </section>
    }
}

//#endregion

//#region login

class Login extends React.Component {
    state = { email: '', password: ''}

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })
    
    handleFormSubmit = event => {
        event.preventDefault()
        
        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleOnRegister = event => {
        event.preventDefault()

        const { props: { onToRegister }} = this

        onToRegister()
    }
    
    render() {
        const { handleEmailInput, handlePasswordInput, handleFormSubmit,handleOnRegister, props: { feedback } } = this

        return <section className="container-fluid">
            <form onSubmit={handleFormSubmit} className="col-12">
                <div className="input-group col-12 m-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Email</span>
                </div>
                <input className="form-control rainbow" name="email" type="email" placeholder="something@example.com" onChange={handleEmailInput}></input>
                </div>
                <div className="input-group col-12 m-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Password</span>
            </div>
            <input className="form-control rainbow" name="password" type="password" placeholder="3xampl3" onChange={handlePasswordInput}></input>
            </div>
            <button className="btn btn-primary login__btn" type="submit">Log In</button>
            <button className="ml-2 btn btn-default" onClick={handleOnRegister}>Register</button>

            </form>

            {feedback && <Feedback message={feedback} level=""/>}

            </section>
    }
}

//#endregion

//#region search

class Search extends React.Component {
    state = { query: ''}

    handleSearchInput = event => this.setState({ query: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: {onSearch} } = this

        onSearch(query)
    }

    handleLogout = () => {

        const { props: { logOut }} = this
        logOut()
    }

    render () {
        const { handleSearchInput, handleFormSubmit, handleLogout, props: {feedback} } = this

        return <section className="search container-fluid col-12">
        <form onSubmit={handleFormSubmit}>
            <div className="input-group form-group">
                <a id="logout__btn" onClick={handleLogout} className="btn-sm btn-primary">Log Out</a>
                <input className="form-control" type="text" placeholder="Search your favourite artists..." name="query" onChange={handleSearchInput}/>
                <button className="btn btn-default" type="submit">Search</button>
            </div>
        </form>

        {feedback && <Feedback message={feedback} level=""/>}

        </section>
    }
}

//#endregion

//#region feedback

function Feedback({ message, level }) {
    return <section className={`col-11 ml-5 m-2 alert alert-danger feedback ${level ? `feedback--${level}` : ''}`}>{message}</section>
}

//#endregion

//#region app

class App extends React.Component {
    state = { loginFeedback: '', registerFeedback: '', searchFeedback: '', registerVisible: false, loginVisible: true, searchVisible: false, artistsVisible: false, albumsVisible: false, tracksVisible: false, songVisible:false, artists: [], albums: [], tracks: [], song: {} }

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

    loginHidden = () => {
        this.setState({
            loginVisible: false,
            registerVisible: true
        })
    }

    handleSearch = (query) => {
        try {
            logic.searchArtists(query, (error, artists) => {
                if (error) {
                    console.error(error.message)
                    this.setState({ searchFeedback: message })
                } else {
                    this.setState({ artistsVisible: true, artists})
                    this.setState({ searchFeedback: '' })
                }
            })
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
    
    render() {

        const { state : { artists, albums, tracks, song, loginFeedback, registerFeedback, searchFeedback, registerVisible, loginVisible, searchVisible, artistsVisible, albumsVisible, tracksVisible, songVisible }, handleLogin, handleRegister, handleSearch, handleAlbum, handleTrack, handleSong, handleArtistsBack, handleLogout, handleAlbumsBack, handleTracksBack, handleSongBack } = this

        return <main className="app">
        {loginVisible && <Login onLogin={handleLogin} onToRegister={this.loginHidden} feedback={loginFeedback}/>}
        {registerVisible && <Register onRegister={handleRegister} onToLogin={this.toggleHidden} feedback={registerFeedback}/>}
        {searchVisible && <Search onSearch={handleSearch} feedback={searchFeedback} logOut={handleLogout}/>}
        {artistsVisible && <Artists artists={artists} onArtist={handleAlbum} goArtistsBack={handleArtistsBack}/>}
        {albumsVisible && <Albums albums={albums} onAlbum={handleTrack} goAlbumsBack={handleAlbumsBack}/>}
        {tracksVisible && <Tracks tracks={tracks} onTrack={handleSong} goTracksBack={handleTracksBack}/>}
        {songVisible && <Song song={song} goSongBack={handleSongBack}/>}
        
        </main>
    }
}

//#endregion

//#region artists

class Artists extends React.Component {

    goToAlbums = id => {
        const { props: { onArtist }} = this

        onArtist(id)
    }

    goBack = () => {
        const { props: { goArtistsBack }} = this
        goArtistsBack()
    }
    
    render() {
        const {props: { artists }, goToAlbums, goBack} = this

        return <section className="results container-fluid center">
        <h3 className="title center">Artists</h3>
        <button onClick={() => goBack()}className="btn-sm btn-secondary goBack" id="goBack">Go Back</button>
        <ul className="row">
            {
                artists.map(({id, images, name}) => {
                    const image = images[0] ? images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IOVPO-Vnj08PeZ9gpDOfDNevf5BufMrtWrjmNJgaGVYMDDh5wA'

                    return <li onClick={() => goToAlbums(id)} key={id} className="card col-md-4 col-xl-3 col-7 m-1 p-3 pb-4 shadow-sm card-hover" id="cursor" data-id={id}>
                        <p /* style="font-size:1.2rem" */ className="card-title text-center">{name}</p>
                        <img className="card-img-top center rounded artist__image" src={image} width="100px"/>
                    </li>
                })
            }
        </ul>

    </section>
    }   
}

//#endregion

//#region albums

class Albums extends React.Component {

    goToTracks = id => {
        const { props: { onAlbum }} = this

        onAlbum(id)
    }

    goBack = () => {
        const { props: { goAlbumsBack }} = this
        goAlbumsBack()
    }

    render() {
        const {props: { albums }, goToTracks, goBack} = this

        return <section className="album container-fluid">
        <h3 className="title">Albums</h3>
        <button onClick={() => goBack()}className="btn-sm btn-secondary goBack" id="goBack">Go Back</button>
        <ul className="row">
        {
            albums.map(({images, id, name}) => {
                const image = images[0] ? images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IOVPO-Vnj08PeZ9gpDOfDNevf5BufMrtWrjmNJgaGVYMDDh5wA'

                return <li onClick={() => goToTracks(id)} key={id} className="card col-md-4 col-xl-3 col-7 m-1 p-3 card-hover" id="cursor" data-id={id} /* style="text-decoration:none" */>
                    <p /* style="font-size:1.2rem; text-align:center" */>{name}</p>
                    <img className="card-img-top shadow center album__image" src={image} width="100px"/>
                </li>
            })
        }
        </ul>
    </section>
    }
}

//#endregion

//#region tracks

class Tracks extends React.Component {
    goToSong = id => {
        const {props: { onTrack }} = this

        onTrack(id)
    }

    goBack = () => {
        const { props: { goTracksBack }} = this
        goTracksBack()
    }
    
    render() {
        const {props: { tracks }, goToSong, goBack} = this

        return <section className="tracks container-fluid">
        <h3 className="title">Tracks</h3>
        <button onClick={() => goBack()}className="btn-sm btn-secondary goBack" id="goBack">Go Back</button>
        <ul>
            {
                tracks.map(({ name, id, duration_ms}) => {
                    const duration = ((duration_ms / 1000) / 60)
                    const durationRound = duration.toFixed(2) + ' M'

                    return <li key={id} className="row" onClick={() => goToSong(id)} data-id={id} id="cursor">
                    <p className="pr-3">${name}</p><p><strong>${durationRound}</strong></p>
                </li>
                })
            }
        </ul>
        </section>
    }
}

//#endregion

//#region song

class Song extends React.Component {
    goBack = () => {
        const { props: { goSongBack }} = this
        goSongBack()
    }

    render() {
        const {props: {song: { name, id, preview_url }}, goBack} = this
        let audio = preview_url === null ? <p className="pt-3">Whoops! There is no preview available!</p> : <audio className="m-3" src={preview_url} controls></audio>

        return <section className="song container-fluid">
        <h3 className="title">Song</h3>
        <button onClick={() => goBack()}className="btn-sm btn-secondary goBack" id="goBack">Go Back</button>
        <ul>
            <div className="card col-8 center artist__image">
                <div className="card-body song-card" /* style="text-decoration:none" */data-id={id}>
                    <p className="card-text align-center">{name}</p>{audio}
                </div>
            </div>
        </ul>
        </section>
    }
}

//#endregion

ReactDOM.render(<App />, document.getElementById('root'))