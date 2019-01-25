spotifyApi.token= 'BQAc-S20Y7d0Ae34ZVjtFvrJN9plo2bMR8xcAk3xV6JB8Qt6a4e9yGRmvZozsyg6Jx_iBGK2u1E71risbpWMe8lwcZo5phXi-Gb3z8Ss7uuxKlCu6XCY2MKGwH4iJUiAnWzBuom5wz5RT6XSyRNpmIS11G2hn-hyGA'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel

const $root = $('#root')

artistsPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)

searchPanel.onSearch = function(query) {
    try {
        logic.searchArtists(query, function(error, artists) {
            if (error) {
                searchPanel.error = error.message

            } else {
                artistsPanel.artists = artists

                artistsPanel.show()
            }
        }) 
    } catch(err) {

    }
}
