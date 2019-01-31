'use strict'

import spotifyApi from '.'

const { env: { REACT_APP_SPOTIFY_API_TOKEN } } = process

spotifyApi.token = /* REACT_APP_SPOTIFY_API_TOKEN */'BQDmUk4fOc_1-BQGOz3H73bUjuVlHO528l0mE_U9A37wfOKdBR55KzhkB9Fdi70Jh7gNPaWFqNooBEHNOQfxlhNad7NGLxsrvqRuLsNRRyNrgQKgmhgwK_a_bj88Mk8E1bM2QgSuwTI8JF9WibHWooJjJ5nPn9dyFg'

describe('spotify api', () => {
    describe('search artists', () => {
        it('should succeed on matching query', () => {
            const query = 'madonna'

            return spotifyApi.searchArtists(query)
                .then(artists => {
                    expect(artists).toBeDefined()
                    expect(artists instanceof Array).toBeTruthy()
                    expect(artists.length).toBeGreaterThan(0)

                    artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))
                })
        })

        it('should fail on empty query', () => {
            const query = ''

            expect(() => spotifyApi.searchArtists(query)).toThrowError('query is empty')
        })
    })

    describe('retrieve albums', () => {
        it('should succeed on matching query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return spotifyApi.retrieveAlbums(artistId)
                .then(albums => {
                    expect(albums).toBeDefined()
                    expect(albums instanceof Array).toBeTruthy()
                    expect(albums.length).toBeGreaterThan(0)
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => spotifyApi.retrieveAlbums(artistId)).toThrowError('artistId is empty')
        })
    })

    describe('retrieve tracks', () => {
        it('should succeed on matching query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

            return spotifyApi.retrieveTracks(albumId)
                .then(tracks => {
                    expect(tracks).toBeDefined()
                    expect(tracks instanceof Array).toBeTruthy()
                    expect(tracks.length).toBeGreaterThan(0)
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => spotifyApi.retrieveTracks(albumId)).toThrowError('albumId is empty')
        })
    })

    describe('retrieve track', () => {
        it('should succeed on matching query', () => {
            const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live
            const trackName = 'Rebel Heart Tour Intro - Live'

            return spotifyApi.retrieveSong(trackId)
                .then(track => {
                    expect(track).toBeDefined()

                    const { id, name } = track

                    expect(id).toBe(trackId)
                    expect(name).toBe(trackName)
                })
        })

        it('should fail on empty trackId', function () {
            const trackId = ''

            expect(() => spotifyApi.retrieveSong(trackId)).toThrowError('id is empty')
        })
    })
})