import React from 'react'
import Hover from '../Hover'
import '../Search/index.sass'

class Artists extends React.Component {
    state = {followersVisual: false, followers: null, selectedId: null}

    goToAlbums = id => {
        const { props: { onArtist }} = this

        onArtist(id)
    }
    goHover = (followers, selectedId) => {
        this.setState({followers, selectedId})
    }
    leaveHover = () => {
        this.setState({followers: null, selectedId: null})
    }

    goBack = () => {
        const { props: { goArtistsBack }} = this
        goArtistsBack()
    }

    toFavourite = name => {
        const favs = []

        favs.push(name)
        console.log(favs)
    }
    
    render() {
        const {props: { artists }, goToAlbums, goBack, goHover, leaveHover} = this
        
        return <section className="results container-fluid center">
        <h3 className="title center">Artists</h3>
        <button onClick={() => goBack()}className="btn-sm btn-secondary goBack" id="goBack">Go Back</button>
        <ul className="row">
            {
                artists.map(({id, images, name, followers}) => {
                    const image = images[0] ? images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IOVPO-Vnj08PeZ9gpDOfDNevf5BufMrtWrjmNJgaGVYMDDh5wA'
                    
                    
                    return <li onClick={() => goToAlbums(id)} onMouseEnter={() => goHover(followers, id)} onMouseLeave={() => leaveHover()} key={id} className="card col-md-4 col-xl-3 col-7 m-1 p-3 pb-4 shadow-sm card-hover" id="cursor" data-id={id}>
                        {this.state.selectedId === id && <Hover followers={followers}/>}
                        <p /* style="font-size:1.2rem" */ className="card-title text-center">{name}</p>
                        <img alt="search" className="card-img-top center rounded artist__image" src={image} width="100px"/>
                    </li>
                })
      
            }
        </ul>

    </section>
    }   
}


export default Artists