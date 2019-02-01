'use strict';

/**
 * Spotify API client.
 * 
 * @version 1.0.0
 */
const spotifyApi = {
    token: '',
    path: 'https://api.spotify.com/v1/',
    /**
     * Searches artists.
     * 
     * @param {string} query - The text to match on search.
     * @param {function} callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    searchArtists(query) {

        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        return fetch(`${this.path}search?q=${query}&type=artist`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error.message)

                const { artists: { items } } = res

                return items
            })
    },
    /**
     * Retrieves albums of an artist
     * @param {*} artistId 
     * @param {*} callback 
     */
    retrieveAlbums(artistId) {

        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return fetch(`${path}artists/${artistId}/albums`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(res => res.json())
            .then(({items}) => items)
    },
    retrieveTracks(albumId) {

        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return fetch(`${path}albums/${albumId}/tracks`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(res => res.json())
            .then(({ items }) => items)
    },
    retrieveSong(id) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw Error('id is empty')

        return fetch(`${path}tracks/${id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(res => res.json())
    }
}

export default spotifyApi