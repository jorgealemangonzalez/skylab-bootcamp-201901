import React from 'react'
import Feedback from '../Feedback'
import '../Search/index.sass'

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

    handleFavourites = () => {
        const { props: {goToFavourites }} = this

        goToFavourites()
    }

    render () {
        const { handleSearchInput, handleFormSubmit, handleLogout, handleFavourites, props: {feedback} } = this

        return <section className="search container-fluid col-12">
        <form onSubmit={handleFormSubmit}>
            <div className="input-group form-group">
                <a href="#" id="logout__btn" onClick={handleLogout} className="btn-sm btn-primary">Log Out</a>
                <a href="#" onClick={handleFavourites} className="btn btn-sm btn-dark">Favourites</a>
                <input className="form-control" type="text" placeholder="Search your favourite artists..." name="query" onChange={handleSearchInput}/>
                <button className="btn btn-default" type="submit"><i className="fas fa-search"></i></button>
            </div>
        </form>

        {feedback && <Feedback message={feedback} level=""/>}

        </section>
    }
}

export default Search
