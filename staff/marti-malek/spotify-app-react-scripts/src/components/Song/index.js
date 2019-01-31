import React from 'react'
import '../Search/index.sass'

class Song extends React.Component {
    state = {liked: false}

    goBack = () => {
        const { props: { goSongBack }} = this
        goSongBack()
    }

    addToFavourite = (id) => {
        const {props: { addFavourite }} = this

        addFavourite(id)
    }
    /* addToFavourite = (id) => {
        const {props: { addFavourite }} = this

        if (window.actualUser.favourite.includes(id)) {
            this.setState({ liked: true })
        } else {
            this.setState({ liked: false})
        }

        this.setState({ liked: !this.state.liked})

        addFavourite(id)
    } */

    render() {
        const {props: {user, song: { name, id, preview_url }}, goBack, addToFavourite} = this
        let audio = preview_url === null ? <p className="pt-3">Whoops! There is no preview available!</p> : <audio className="m-3" src={preview_url} loop controls></audio>

        let heart = user.favourite.includes(id)? "fas fa-heart centerMe heart" : "far fa-heart centerMe heart"
    

        return <section className="song container-fluid">
        <h3 className="title">Song</h3>
        <button onClick={() => goBack()}className="btn-sm btn-secondary goBack" id="goBack">Go Back</button>
        <ul>
            <div className="card col-8 center artist__image">
                <div className="card-body song-card"data-id={id}>
                    <p className="card-text align-center">{name}</p>
                    <div className="row">
                        <div className="col-10">{audio}</div>
                        <i onClick={() => addToFavourite(id)} className={heart}></i>
                    </div>
                </div>
            </div>
        </ul>
        </section>
    }
}

export default Song