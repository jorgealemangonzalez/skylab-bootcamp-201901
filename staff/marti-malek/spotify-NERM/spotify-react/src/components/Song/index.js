import React from 'react'
import '../Search/index.sass'

class Song extends React.Component {
    state = { commentText: '' }

    goBack = () => {
        const { props: { goSongBack } } = this
        goSongBack()
    }

    addToFavourite = (id) => {
        const { props: { addFavourite } } = this

        const trackId = id

        addFavourite(trackId)
    }

    handleCommentText = e => this.setState({ commentText: e.target.value })

    addComment = id => {
        const { props: { addCommentToTrack }, state: { commentText } } = this

        addCommentToTrack(id, commentText)
    }

    deleteComment = (commentId, trackId) => {
        const { props: { deleteCommentFromTrack } } = this

        deleteCommentFromTrack(commentId, trackId)
    }

    render() {
        const { props: { song: { name, id, preview_url, isFavorite }, trackComments, actualUserId }, goBack, addToFavourite, addComment, handleCommentText, deleteComment } = this

        let audio = preview_url === null ? <p className="pt-3">Whoops! There is no preview available!</p> : <audio className="m-3" src={preview_url} loop controls></audio>

        let heart = isFavorite ? "ml-2 fas fa-heart centerMe heart" : "ml-2 far fa-heart centerMe heart"

        return <section className="song container-fluid">
            <h3 className="title">Song</h3>
            <button onClick={() => goBack()} className="btn-sm btn-secondary goBack" id="goBack">Go Back</button>
            <div className="card col-8 center artist__image">
                <div className="card-body song-card" data-id={id}>
                    <p className="card-text align-center">{name}</p>
                    <div className="row">
                        <div className="col-10">{audio}</div>
                        <i onClick={() => addToFavourite(id)} className={heart}></i>
                    </div>
                </div>
            </div>
            {/* Add Comment */}
            <div className="card col-8 mt-3 mb-3 p-0 center artist__image">
                <p className="card-header bg-secondary text-white col-12 align-center">Comments</p>
                <div className="card-body song-card">
                    <div className="card-text d-flex">
                        <textarea className="col-12 mr-2" placeholder="comment something...." onChange={handleCommentText}></textarea>
                        <button onClick={() => addComment(id)} className="m-1 btn btn-dark btn-sm center ml-auto">Add comment</button>
                    </div>
                </div>
            </div>
            {/* Comments */}
            <ul className="p-0">
                {trackComments ?
                    trackComments.slice(0).reverse().map(({ userId, text, date, id }) => {
                        return <li key={id} className="card col-8 p-0 mt-2 center artist__image">
                            <div className="card-header col-12 align-center d-flex flex-row-reverse align-items">
                                {userId === actualUserId ?
                                    <i onClick={() => deleteComment(id, this.props.song.id)} className="fas fa-times col-2 mt-1"></i>
                                    : null}
                                <h4 className="col-8 m-0 p-0">{userId}</h4>
                            </div>
                            <div className="card-body center song-card">
                                <p className="card-text col-12 center align-center">{text}</p>
                                <p className="card-text col-12 center align-center">{date}</p>
                            </div>
                        </li>
                    })
                    : null
                }
            </ul>

        </section>
    }
}

export default Song