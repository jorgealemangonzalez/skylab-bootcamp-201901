require('dotenv').config()

require('isomorphic-fetch')

const { MongoClient } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')
const users = require('./data/users')
const logic = require('./logic')
const cors = require('cors')

const { registerUser, authenticateUser, retrieveUser, searchArtists, notFound, updateUser, retrieveArtist, addCommentToArtist, addCommentToTrack, listCommentsFromArtist, listCommentsFromTrack, toggleFavouriteTrack, retrieveAlbum, retrieveTrack, deleteCommentFromTrack } = require('./routes')

const { env: { DB_URL,PORT, SPOTIFY_API_TOKEN, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process


MongoClient.connect(DB_URL, { useNewUrlParser: true })
    .then(client => {
        const db = client.db()
        users.collection = db.collection('users')
        
        spotifyApi.token = SPOTIFY_API_TOKEN

        logic.jwtSecret = JWT_SECRET
        const app = express()

        app.use(cors())
        
        const jsonBodyParser = bodyParser.json()
        
        const router = express.Router()
        
        router.post('/user', jsonBodyParser, registerUser)
        
        router.post('/user/auth', jsonBodyParser, authenticateUser)
        
        router.get('/user/:id', retrieveUser)
        
        router.get('/search/:query', searchArtists) // search
        
        router.post('/artist/:id/comment', jsonBodyParser, addCommentToArtist)

        router.post('/track/:trackId/comment', jsonBodyParser, addCommentToTrack)
        
        router.get('/artist/:id/comment', listCommentsFromArtist)

        router.get('/track/:trackId/comment', listCommentsFromTrack)

        router.delete('/track/:trackId/comment', jsonBodyParser, deleteCommentFromTrack)
        
        router.get('/artist/:id', retrieveArtist) // albums
        
        router.get('/album/:albumId', retrieveAlbum) // tracks
        
        // router.get('/tracks/:id', retrieveTracks)
        
        router.get('/track/:trackId', retrieveTrack) // song
        
        router.post('/user/profile', jsonBodyParser, updateUser)
        
        router.post('/track/:trackId', jsonBodyParser, toggleFavouriteTrack)
        
        // router.post('/album/:id', toggleFavouriteAlbum)
        
        router.get('*', notFound)
        
        app.use('/api', router)
        
        app.listen(port, () => console.log(`server running on port ${port}`))
    })
    .catch(console.error)