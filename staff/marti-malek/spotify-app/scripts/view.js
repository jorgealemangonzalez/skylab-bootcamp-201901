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

//#region register panel

class RegisterPanel extends Panel {
    constructor() {
        super($(`<section class="container-fluid">
        <form>
        <div class="input-group col-12 m-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Name</span>
            </div>
            <input class="form-control mr-3" id="rainbow" name="name" type="text" placeholder="John"></input>
        </div>
        <div class="input-group col-12 m-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Surname</span>
            </div>
            <input class="form-control mr-3" id="rainbow" name="surname" type="text" placeholder="Doe"></input>
        </div>
        <div class="input-group col-12 m-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Email</span>
            </div>
            <input class="form-control mr-3" id="rainbow" name="email" type="email" placeholder="something@example.com"></input>
        </div>
        <div class="input-group col-12 m-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Password</span>
            </div>
            <input class="form-control mr-3" id="rainbow" name="password" type="password" placeholder="3xampl3"></input>
        </div>
        <div class="input-group col-12 m-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Confirm Password</span>
            </div>
            <input class="form-control mr-3" id="rainbow" name="confirm" type="password" placeholder="3xampl3"></input>
        </div>
        <button class="btn btn-primary" id="login__btn" type="submit">Register</button>
        </form></section>`))
        this.__$form__ = this.$container.find('form')
        this.__$nameInput__ = this.__$form__.find('input[name=name]')
        this.__$surnameInput__ = this.__$form__.find('input[name=surname]')
        this.__$emailInput__ = this.__$form__.find('input[type=email]')
        this.__$passwordInput__ = this.__$form__.find('input[type=password]')
        this.__$passwordConfirmInput__ = this.__$form__.find('input[name=confirm]')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
        this.__errorPanel__.hide()

        var $login = $('<button class="btn btn-default">Log In</button>')
        this.__$form__.append($login)
        this.__$login__ = $login
    }

    set onRegister(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()

            const name = this.__$nameInput__.val()
            const surname = this.__$surnameInput__.val()
            const email = this.__$emailInput__.val()
            const password = this.__$passwordInput__.val()
            const passwordConfirm = this.__$passwordConfirmInput__.val()

            callback(name, surname, email, password, passwordConfirm)
        })
    }

    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }
    
    clear() {
        this.__$nameInput__.val('')
        this.__$surnameInput__.val('')
        this.__$emailInput__.val('')
        this.__$passwordInput__.val('')
        this.__$passwordConfirmInput__.val()
        this.__errorPanel__.message = ''
        this.__errorPanel__.hide()
    }
    
    set onGoToLogin(callback) {
        this.__$login__.on('click', callback)   
    }

    errorHide() {
        this.__errorPanel__.message = ''
        this.__errorPanel__.hide()
    }
}

//#endregion

//#region login panel

class LoginPanel extends Panel {
    constructor() {
        super($(`<section class="container-fluid">
        <form class="col-12">
            <div class="input-group col-12 m-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Email</span>
                </div>
                <input class="form-control" id="rainbow" name="email" type="email" placeholder="something@example.com"></input>
            </div>
            <div class="input-group col-12 m-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Password</span>
            </div>
            <input class="form-control" id="rainbow" name="password" type="password" placeholder="3xampl3"></input>
            </div>
            <button class="btn btn-primary" id="login__btn" type="submit">Log In</button>
        </form>
        
        </section>`))

        this.__$form__ = this.$container.find('form')
        this.__$emailInput__ = this.__$form__.find('input[type=email]')
        this.__$passwordInput__ = this.__$form__.find('input[type=password]')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
        this.__errorPanel__.hide()

        var $register = $('<button href="#" class="btn btn-default">Register</button>')
        this.__$form__.append($register)
        this.__$register__ = $register
    }

    set onLogin(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()

            const email = this.__$emailInput__.val()
            const password = this.__$passwordInput__.val()

            callback(email, password)
        })
    }

    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }

    clear() {
        this.__$emailInput__.val('')
        this.__$passwordInput__.val('')
        this.__errorPanel__.message = ''
        this.__errorPanel__.hide()
    }

    set onGoToRegister(callback) {
        this.__$register__.on('click', callback)
    }

    errorHide() {
        this.__errorPanel__.message = ''
        this.__errorPanel__.hide()
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
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;

        var $logout = $('<a href="#" id="logout__btn" class="btn-sm btn-primary">Log Out</a>')
        this.__$form__.append($logout)
        this.__$logout__ = $logout

        errorPanel.hide()
    }
    
    set onSearch(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()

            const query = this.__$query__.val()

            callback(query)
        })
    }

    clear() {
        this.__$query__.val('')
    }

    set onLogout(callback) {
        this.__$logout__.on('click', callback)
    }
    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }

    errorHide() {
        this.__errorPanel__.message = ''
        this.__errorPanel__.hide()
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
        var errorPanel = new ErrorPanel
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel

        errorPanel.hide()
    }

    set artists(artists) {
        artists.forEach(({ id, name, images, followers }) => {
            const image = images[0] ? images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IOVPO-Vnj08PeZ9gpDOfDNevf5BufMrtWrjmNJgaGVYMDDh5wA'
            /* const $gobtn = `<form><button type="submit">Albums</button></form>` */
            const $item = $(`<li class="card col-md-4 col-xl-3 col-7 m-1 p-3 pb-4 shadow-sm card-hover" id="cursor" data-id=${id}><p style="font-size:1.2rem" class="card-title text-center">${name}</p><img class="card-img-top center rounded artist__image" src="${image}" width="100px"></li>`)
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

    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }

    clear () {
        this.__$list__.empty()
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

        var errorPanel = new ErrorPanel
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel

        var $goBack = $('<a href="#" class="btn-sm btn-secondary" id="goBack">Go Back</a>')
        this.$container.append($goBack)
        this.__$goBack__ = $goBack

        errorPanel.hide()
    }
    set items(items) {

        items.forEach(({id, name, images}) => {
            const image = images[0] ? images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IOVPO-Vnj08PeZ9gpDOfDNevf5BufMrtWrjmNJgaGVYMDDh5wA'
            const $item = $(`<li class="card col-md-4 col-xl-3 col-7 m-1 p-3 card-hover" id="cursor" data-id=${id} style="text-decoration:none"><p style="font-size:1.2rem; text-align:center">${name}</p><img class="card-img-top shadow center album__image" src="${image}" width="100px"></li>`)

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

    set goBack(callback) {
        this.__$goBack__.on('click', callback)
    }

    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }

    clear () {
        this.__$list__.empty()
    }
}

//#endregion

//#region tracks panel

class TracksPanel extends Panel {
    constructor() {
        super($(`<section class="tracks container-fluid">
        <h3 class="title">Tracks</h3>
        <ul></ul>
        </section>`))

        this.__$list__ = this.$container.find('ul')

        var errorPanel = new ErrorPanel
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel

        var $goBack = $('<a href="#" class="btn-sm btn-secondary" id="goBack">Go Back</a>')
        this.$container.append($goBack)
        this.__$goBack__ = $goBack

        errorPanel.hide()
    }

    set tracks(tracks) {
        
        tracks.forEach(({id, name, duration_ms }) => {
            const duration = ((duration_ms / 1000) / 60)
            const durationRound = duration.toFixed(2) + ' M'
            const $item = $(`<li class="row" data-id=${id} id="cursor"><p class="pr-3">${name}</p><p><strong>${durationRound}</strong></p></li>`)

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

    set goBack(callback) {
        this.__$goBack__.on('click', callback)
    }

    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }

    clear () {
        this.__$list__.empty()
    }
}

//#endregion

//#region song panel

class SongPanel extends Panel {
    constructor() {
        super($(`<section class="song container-fluid">
        <h3 class="title">Song</h3>
        <ul></ul>
        </section>`))

        this.__$list__ = this.$container.find('ul')

        var errorPanel = new ErrorPanel
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel

        var $goBack = $('<a href="#" class="btn-sm btn-secondary" id="goBack">Go Back</a>')
        this.$container.append($goBack)
        this.__$goBack__ = $goBack

        errorPanel.hide()
    }

    set song({id, name, preview_url}) { 
        const $item = $(`<div class="card col-8 center artist__image"><div class="card-body song-card" style="text-decoration:none"data-id=${id}><p class="card-text align-center">${name}</p><audio class="m-3" src="${preview_url}" controls></audio></div></div>`)

        this.__$list__.append($item)
    }

    set goBack(callback) {
        this.__$goBack__.on('click', callback)
    }

    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }

    clear () {
        this.__$list__.empty()
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