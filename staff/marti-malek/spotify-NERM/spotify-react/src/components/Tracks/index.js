import React from 'react'
import '../Search/index.sass'


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
                    <p className="pr-3">{name}</p><p><strong>{durationRound}</strong></p>
                </li>
                })
            }
        </ul>
        </section>
    }
}

export default Tracks
