spotifyApi.token= 'BQAc-S20Y7d0Ae34ZVjtFvrJN9plo2bMR8xcAk3xV6JB8Qt6a4e9yGRmvZozsyg6Jx_iBGK2u1E71risbpWMe8lwcZo5phXi-Gb3z8Ss7uuxKlCu6XCY2MKGwH4iJUiAnWzBuom5wz5RT6XSyRNpmIS11G2hn-hyGA'

describe('logic', function() {
    describe('searches artists', function() {
        it('should succeed on matching query', function(done) {
            const query = 'madonna'

            logic.searchArtists(query, function(error,artists) {
                expect(error).toBeUndefined()

                expect(artists).toBeDefined()
                expect(artists instanceof Array).toBeTruthy()
                expect(artists.length).toBeGreaterThan(0)

                artists.forEach(({name}) => expect(name.toLowerCase()).toContain(query))

                done()
            })
        })
        it('should fail on empty query', function() {
            const query = ''

            expect(() => logic.searchArtists(query, function(error,artists) {})).toThrowError('query is empty')
        })
    })
})