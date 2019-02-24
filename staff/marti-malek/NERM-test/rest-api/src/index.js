require('dotenv').config()

require('isomorphic-fetch')

const { MongoClient } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')
const users = require('./data/users')
const logic = require('./logic')
const cors = require('cors')

const { registerUser, authenticateUser, retrieveUser, searchArtists, notFound, updateUser, retrieveArtist, addCommentToArtist, listCommentsFromArtist, toggleFavouriteArtist, toggleFavouriteAlbum, retrieveAlbum, retrieveTrack } = require('./routes')

const { env: { DB_URL, PORT, SPOTIFY_API_TOKEN, SECRET_JWT }, argv: [, , port = PORT || 8080] } = process


MongoClient.connect(DB_URL, { useNewUrlParser: true })
    .then(client => {
        const db = client.db()
        users.collection = db.collection('users')

        spotifyApi.token = SPOTIFY_API_TOKEN
        logic.jwtSecret = SECRET_JWT

        const app = express()

        app.use(cors())

        const jsonBodyParser = bodyParser.json()

        const router = express.Router()

        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.get('/user/:id', retrieveUser)

        router.get('/artists', searchArtists)

        router.post('/artist/:id/comment', addCommentToArtist)

        router.get('/artist/:id/comment', listCommentsFromArtist)

        router.get('/artist/:id', retrieveArtist)

        router.get('/album/:id', retrieveAlbum)

        // router.get('/tracks/:id', retrieveTracks)

        router.get('/track/:id', retrieveTrack)

        router.post('/user/profile', updateUser)

        router.post('/artist/:id', toggleFavouriteArtist)

        // router.post('/album/:id', toggleFavouriteAlbum)

        app.get('*', notFound)

        app.use('/api', router)

        app.listen(port, () => console.log(`server running on port ${port}`))
    })
    .catch(console.error)