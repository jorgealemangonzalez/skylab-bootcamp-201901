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
        super($(`<section class="search container-fluid col-12">
            <form>
                <div class="input-group form-group">
                    <input class="form-control" type="text" placeholder="Search an artist..." name="query">
                    <button class="btn btn-default" type="submit">Search</button>
                </div>
            </form>
        </section>`))

        this.__$form__ = this.$container.find('form')
        this.__$query__ = this.__$form__.find('input')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;
    }
    
    set onSearch(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()

            const query = this.__$query__.val()

            callback(query)
        })
    }
    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
}

//#endregion

//#region artists panel

class ArtistsPanel extends Panel {
    constructor() {
        super($(`<section class="results container-fluid center">
            <ul class="row" id="ul"></ul>
        </section>`))

        this.__$list__ = this.$container.find('ul')
        /* this.$container.scrollspy({ target: '#ul' }) */
    }

    set artists(artists) {
        artists.forEach(({ id, name, images, followers }) => {
            const image = images[0] ? images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IOVPO-Vnj08PeZ9gpDOfDNevf5BufMrtWrjmNJgaGVYMDDh5wA'
            /* const $gobtn = `<form><button type="submit">Albums</button></form>` */
            const $item = $(`<li class="card col-md-4 col-xs-8 m-1 p-3" data-id=${id}><p style="font-size:1.2rem" class="card-title text-center">${name}</p><img class="card-img-top center rounded artist__image" src="${image}" width="100px"></li>`)

            /* $gobtn.on('submit', () => {
                console.log('hello')
            }) */

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

        items.forEach(({id, name, images}) => {
            const image = images[0] ? images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IOVPO-Vnj08PeZ9gpDOfDNevf5BufMrtWrjmNJgaGVYMDDh5wA'
            const $item = $(`<li data-id=${id} style="text-decoration:none">${name}<img src="${image}" width="80%"></li>`)

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

//#region song panel

class SongPanel extends Panel {
    constructor() {
        super($(`<section class="song container">
        <h3>Song</h3>
        <ul></ul>
        </section>`))

        this.__$list__ = this.$container.find('ul')
    }

    set song({id, name}) {
        const $item = $(`<li data-id=${id}>${name}</li>`)

        this.__$list__.append($item)
    }
}

//#endregion

//#region error panel

class ErrorPanel extends Panel {
    constructor() {
        super($(`<section class="error alert alert-danger"></section>`))
    }

    set message(message) {
        this.$container.text(message)
    }
}

//#endregion