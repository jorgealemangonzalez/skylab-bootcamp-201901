'use strict';

/**
 * Duckling API client.
 * 
 * @version 2.2.0
 */
const spotifyApi = {
    token: '',
    /**
     * Searches ducklings.
     * 
     * @param {string} query - The text to match on search.
     * @param {function} callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    searchArtists(query, callback) {
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(res => res.json())
            .then(({artists: { items }}) => callback(undefined, items))
            .catch(callback)
    },
    /**
     * Retrieves albums of an artist
     * @param {*} artistId 
     * @param {*} callback 
     */
    retrieveAlbums(artistId, callback) {
        fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            method: 'GET',
            headers: {
                authorization: 'Bearer BQAc-S20Y7d0Ae34ZVjtFvrJN9plo2bMR8xcAk3xV6JB8Qt6a4e9yGRmvZozsyg6Jx_iBGK2u1E71risbpWMe8lwcZo5phXi-Gb3z8Ss7uuxKlCu6XCY2MKGwH4iJUiAnWzBuom5wz5RT6XSyRNpmIS11G2hn-hyGA'
            }
        })
            .then(res => res.json())
            .then(({ items }) => callback(undefined, items))
    }
}