import React from 'react'
import '../Favourites/index.sass'

class Favourite extends React.Component {
    goToSong = id => {
        const {props: {onTrackClick}} = this

        onTrackClick(id)
    }

    goBack = () => {
        const {props: {goFavsBack}} = this

        goFavsBack()
    }
    
    render() {
        const {props: {favouriteTracks}, goToSong, goBack} = this
        return <section className="tracks container-fluid">
        <h3 className="title">Tracks</h3>
        <a onClick={() => goBack()}className="btn-sm btn-secondary goBack" id="goBack">Go Back</a>
        <ul>
            {
                favouriteTracks.map(({ name, id, duration_ms}) => {
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

export default Favourite