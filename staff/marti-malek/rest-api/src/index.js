require('dotenv').config()

require('isomorphic-fetch')

const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')

const { register, authenticate, retrieve, notFound, searchArtists, retrieveAlbums, retrieveTracks, retrieveTrack } = require('./routes')

const { env: { PORT, SPOTIFY_API_TOKEN }, argv: [, , port = PORT || 8080] } = process

spotifyApi.token = SPOTIFY_API_TOKEN

const app = express()

const jsonBodyParser = bodyParser.json()

app.post('/register', jsonBodyParser, register.post)

app.post('/authenticate', jsonBodyParser, authenticate.post)

app.get('/retrieve/:userId', retrieve.get)

app.get('/search/:query', searchArtists.get)

app.get('/artist/:artistId', retrieveAlbums.get)

app.get('/album/:albumId', retrieveTracks.get)

app.get('/track/:trackId', retrieveTrack.get)

// app.get('*', notFound.get)

app.listen(port, () => console.log(`server running on port ${port}`))