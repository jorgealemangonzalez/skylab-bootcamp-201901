const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')
const fsPromises = fs.promises
const file = path.join(__dirname, 'artist-comments.json')


const artistComment = {
    file: 'artist-comments.json',

    add: comment => {
        comment.id = uuid()
        
        return fsPromises.readFile(file, 'utf8')
            .then(comments => JSON.parse(comments))
            .then(content => {
                content.push(comment)
                return content
            })
            .then(content => fsPromises.writeFile(file, JSON.stringify(content))
        )
    },
    retrieve: id => {
        return fsPromises.readFile(file, 'utf8')
            .then(content => JSON.parse(content))
            .then(content => {
                let result = content.find(comment => comment.id === id)
                if (result) result.date = new Date(result.date)
                return result? result : null
            })
    },
    update: comment => {
        return fsPromises.readFile(file, 'utf8')
            .then(comments => JSON.parse(comments))
            .then(content => {
                const index = content.findIndex(elem => elem.id === comment.id)
                content.splice(index, 1)
                content.push(comment)
                return content
            })
            .then(content => fsPromises.writeFile(file, JSON.stringify(content)))
    },
    delete: id => {
        return fsPromises.readFile(file, 'utf8')
            .then(comments => JSON.parse(comments))
            .then(content => {
                const index = content.findIndex(elem => elem.id === id)
                content.splice(index, 1)
                return content
            })
            .then(content => fsPromises.writeFile(file, JSON.stringify(content)))
    },
    find: criteria => {
        return fsPromises.readFile(file, 'utf8')
            .then(comments => JSON.parse(comments))
            .then(content => {
                Object.keys(criteria).forEach(key => {
                    content = content.filter(comment => comment[key] === criteria[key])
                    //content.date = new Date(content.date)
                })
                return content
            })
            .then(content => {
                content.forEach(comment => comment.date = new Date(comment.date))
                return content
            })
        }
}

module.exports = artistComment