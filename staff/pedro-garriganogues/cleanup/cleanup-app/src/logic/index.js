'user strict'

// const cleanUpApi = require('../api')
import cleanUpApi from '../api'

const logic = {
    __userId__: null,
    // __userApiToken__: null,
    // __userApiProducts__: null,
    _userId: null,
    _orderStatus: 'transaction pending',

    registerUser(name, surname, email, password, passwordConfirmation) {

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        return (async () => {
            try {
                const answer = await cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)
                console.log(answer)
            } catch (error) {
                console.log(error)
            }
        })()

    },

    logInUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return cleanUpApi.authenticateUser(email, password)
            .then(({ token, id }) => {
                this.__userApiToken__ = token
                this.__userId__ = id
            })
    },

    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },


    logout() {

        sessionStorage.clear()
        window.location.reload()
    },

    retrieveUser() {
        return cleanUpApi.retrieveUser(this.__userId__, this.__userApiToken__)
            .then(res => res)
    },


    listProducts(category) {
        return cleanUpApi.listProducts(category)
            .then(products => {
                return products
            })
    },

    listProductsByIds() {

        return cleanUpApi.listProductsByIds(this.cart)
    },

    getProduct(productId) {
        return cleanUpApi.getProduct(productId)
            .then(product => product)
    },


    listTheProducts() {

        return cleanUpApi.listTheProducts()
            .then(products => products)
    },

    cart(cart) {
        if (cart !== undefined) {
            this._cart = cart

            return
        }

        return this._cart
    },




    addProductToCart(product) {

        let _products = this.__userApiProducts__ || []

        _products.push(product)

        this.__userApiProducts__ = _products
    },

    getCart() {
        return this.__userApiProducts__ || []
    },

    removeProductFromCart() {
        sessionStorage.removeItem('__userApiProducts__')
        window.location.reload()
    },


}

export default logic





// const logic = {
//     __userId__: null,
//     __userApiToken__: null,

//     registerUser(name, surname, email, password, passwordConfirmation) {
//         if (typeof name !== 'string') throw TypeError(name + ' is not a string')

//               return cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)
//             .then(() => { })
//     }

// }

// export default logic