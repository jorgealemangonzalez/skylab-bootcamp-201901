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
                    <input class="form-control" type="text" placeholder="Search your favourite artists..." name="query">
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
            <h3 class="title center">Artists</h3>
            <ul class="row"></ul>
        </section>`))

        this.__$list__ = this.$container.find('ul')
        /* this.$container.scrollspy({ target: '#ul' }) */
    }

    set artists(artists) {
        artists.forEach(({ id, name, images, followers }) => {
            const image = images[0] ? images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IOVPO-Vnj08PeZ9gpDOfDNevf5BufMrtWrjmNJgaGVYMDDh5wA'
            /* const $gobtn = `<form><button type="submit">Albums</button></form>` */
            const $item = $(`<li class="card col-md-4 col-xs-8 m-1 p-3 pb-4 shadow-sm card-hover" data-id=${id}><p style="font-size:1.2rem" class="card-title text-center">${name}</p><img class="card-img-top center rounded artist__image" src="${image}" width="100px"></li>`)
            var tmp = null;

            $($item).popover({
                    trigger: 'manual',
                    title: `Followers: ${followers.total}`,
                    delay: {show:500, hide:100}
            });

            $($item).hover(function(){
                    clearTimeout(tmp);
                    $($item).popover('show');
                    tmp = setTimeout(function(){$($item).popover('hide')}, 1500);
            }, function(){})

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
        super($(`<section class="album container-fluid">
            <h3 class="title">Albums</h3>
            <ul class="row"></ul>
        </section>`))

        this.__$list__ = this.$container.find('ul')
    }
    set items(items) {

        items.forEach(({id, name, images}) => {
            const image = images[0] ? images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IOVPO-Vnj08PeZ9gpDOfDNevf5BufMrtWrjmNJgaGVYMDDh5wA'
            const $item = $(`<li class="card col-md-4 col-xs-8 m-1 p-3 card-hover"data-id=${id} style="text-decoration:none"><p style="font-size:1.2rem; text-align:center">${name}</p><img class="card-img-top shadow center album__image" src="${image}" width="100px"></li>`)

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
        <h3 class="title">Tracks</h3>
        <ul></ul>
        </section>`))

        this.__$list__ = this.$container.find('ul')
    }

    set tracks(tracks) {
        
        tracks.forEach(({id, name, duration_ms }) => {
            const duration = ((duration_ms / 1000) / 60)
            const durationRound = duration.toFixed(2) + ' M'
            const $item = $(`<li class="row" data-id=${id}><p class="pr-3">${name}</p><p class=""><strong>${durationRound}</strong></p></li>`)

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

    set song({id, name}) { //Object???
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