import React from 'react'
import '../Search/index.sass'

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
                    <img alt="album-cover" className="card-img-top shadow center album__image" src={image} width="100px"/>
                </li>
            })
        }
        </ul>
    </section>
    }
}

export default Albums