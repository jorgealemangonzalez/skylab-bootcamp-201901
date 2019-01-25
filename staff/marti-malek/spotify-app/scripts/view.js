//#region panel

class Panel {
    constructor($container) {
        this.$container = $container
    }
    show() {
        this.$container.show()
    }
    hide() {
        this.$container.hide()
    }
}

//#endregion

//#region search panel

class SearchPanel extends Panel {
    constructor() {
        super($(`<section class="search container">
            <h2>Search</h2>
            <form>
                <input type="text" placeholder="Search an artist..." name="query">
                <button type="submit">Search</button>
            </form>
        </section>`))

        this.__$form__ = this.$container.find('form')
        this.__$query__ = this.__$form__.find('input')
    }
    
    set onSearch(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()

            const query = this.__$query__.val()

            callback(query)
        })
    }
}

//#endregion

//#region artists panel

class ArtistsPanel extends Panel {
    constructor() {
        super($(`<section class="results container">
            <h3>Artists</h3>
            <ul></ul>
        </section>`))

        this.__$list__ = this.$container.find('ul')
    }

    set artists(artists) {
        artists.forEach(({ id, name, images }) => {
            const image = images[0] ? images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IOVPO-Vnj08PeZ9gpDOfDNevf5BufMrtWrjmNJgaGVYMDDh5wA'
            const $item = $(`<li data-id=${id}>${name}<img src="${image}" width="100px"></li>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onAlbumSelectedCallback__(id)                
            })

            this.__$list__.append($item)
        })
    }

    set onAlbumSelected(callback) {
        this.__onAlbumSelectedCallback__ = callback
    }
}

//#endregion

//#region albums panel

class AlbumsPanel extends Panel {
    constructor() {
        super($(`<section class="album container">
            <h3>Albums</h3>
            <ul></ul>
        </section>`))

        this.__$list__ = this.$container.find('ul')
    }
    set items(items) {
        /* this.__$list__.html(''); */

        items.forEach(({id, name}) => {
            const $item = $(`<li data-id=${id}>${name}</li>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onTrackSelectedCallback__(id)
            })

            this.__$list__.append($item)
        })
    }

    set onTrackSelected(callback) {
        this.__onTrackSelectedCallback__ = callback
    }
}

//#endregion

//#region tracks panel

class TracksPanel extends Panel {
    constructor() {
        super($(`<section class="tracks container">
        <h3>Tracks</h3>
        <ul></ul>
        </section>`))

        this.__$list__ = this.$container.find('ul')
    }

    set tracks(tracks) {
        
        tracks.forEach(({id, name}) => {
            const $item = $(`<li data-id=${id}>${name}</li>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onSongSelectedCallback__(id)
            })

            this.__$list__.append($item)
        })
    }

    set onSongSelected(callback) {
        this.__onSongSelectedCallback__ = callback
    }
}

//#endregion

class SongPanel extends Panel {
    constructor() {
        super($(`<section class="song container">
        <h3>Song</h3>
        <ul></ul>
        </section>`))

        this.__$list__ = this.$container.find('ul')
    }

    set song(song) {
        song.name = name
        song.id = id
        const $item = $(`<li data-id=${id}>${name}</li>`)

        this.__$list__.append($item)
    }
}